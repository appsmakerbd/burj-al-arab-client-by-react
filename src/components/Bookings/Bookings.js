import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Bookings = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [bookings,setBookings]=useState([]);
    const url=`http://localhost:5000/allbookings?email=${loggedInUser.email}`;
    useEffect(()=>{
        fetch(url,{
            method:"GET",
            headers:{
                authorization : `Bearer ${sessionStorage.getItem('token')}`,
                'Content-type':'application/json'
            }
            
        })
        .then(res=>res.json())
        .then(data=>{
            setBookings(data);
        })
    },[])
    
    const dateFormating=(theDate)=>{
        return (new Date(theDate)).toDateString('dd/MM/YY');
    }
    return (
        <div>
            <h1>You have {bookings && bookings.length} Bookings</h1>
            <ul>
            {

                bookings.map(singleBook=><li><strong>Check In:</strong>{dateFormating(singleBook.checkIn)} | <strong>Check Out:</strong> {dateFormating(singleBook.checkOut)}</li>)
            }
            </ul>
        </div>
    );
};

export default Bookings;