import React, { useContext, useState } from 'react';
import 'date-fns';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { Button } from '@material-ui/core';
import Bookings from '../Bookings/Bookings';

const Book = () => {
    const {bedType} = useParams();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    // The first commit of Material-UI
    const [selectedDate, setSelectedDate] = useState({
        checkIn: new Date(),
        checkOut: new Date()
    });

    //Handle Checkuou Date
    const handleCheckInDate = (date) => {
        const newDates={...selectedDate}
        newDates.checkIn=date;
        setSelectedDate(newDates);
    };

    //Handle Checkuou Date
    const handleCheckOutDate = (date) => {
        const newDates={...selectedDate}
        newDates.checkOut=date;
        setSelectedDate(newDates);
      };


      const handleBooking=()=>{
          const url=`http://localhost:5000/newBooking`;
          const newBookingInfo={...selectedDate,...loggedInUser}
          console.log(newBookingInfo);
          fetch(url,{
            method:"POST",
            headers:{"Content-type":"application/json"},
            body:JSON.stringify(newBookingInfo)
          })
          .then(res=>res.json())
          .then(data=>{
            console.log(data);
          })
          .catch(err=>{
            console.log(err);
          })


      }
    return (
        <div style={{textAlign: 'center'}}>
            <h1>Hello {loggedInUser.name}! Let's book a {bedType} Room.</h1>
            <p>Want a <Link to="/home">different room?</Link> </p>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justify="space-around">
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="dd/MM/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="Date picker inline"
                  value={selectedDate.checkIn}
                  onChange={handleCheckInDate}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  label="Date picker dialog"
                  format="dd/MM/yyyy"
                  value={selectedDate.checkOut}
                  onChange={handleCheckOutDate}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
                
              </Grid>
              
              <Button onClick={handleBooking} variant="contained" color="primary">Book Now</Button>
            </MuiPickersUtilsProvider>

            <Bookings></Bookings>
        </div>
    );
};

export default Book;