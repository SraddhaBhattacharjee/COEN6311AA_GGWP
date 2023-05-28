import React, { useState } from 'react'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import BookingNavbar from './BookingNavbar';
import TravelBookings from './TravelBookings';


const Booking = () => {
    const location = useLocation();
    const splits = location.pathname.split('/');
      const userId = splits[splits.length - 1];
      const [bookings, setBookings] = useState([]);

      const [users, setUsers] = useState([])

      React.useEffect(() => {
        fetch('https://travel-package-management.herokuapp.com/users')
        .then(res => res.json())
        .then(data => setUsers(data))
        .catch(err => console.log(err))
              
      }, [])

    return (
        <div>
          <BookingNavbar user={users.filter(u => u.id === +userId)} users={users}  bookings={bookings} setBookings={setBookings} />
          <TravelBookings bookings={bookings} setBookings={setBookings} />
        </div>
      )
}

export default Booking
