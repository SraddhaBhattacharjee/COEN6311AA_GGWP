import React, { useState } from 'react'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import BookingNavbar from './BookingNavbar';
import TravelBookings from './TravelBookings';
import Notification from './Notification';


const Booking = () => {
    const location = useLocation();
    const splits = location.pathname.split('/');
      const userId = splits[splits.length - 1];
      const [bookings, setBookings] = useState([]);

      const [users, setUsers] = useState([]);
      const [showNotification, setShowNotification] = React.useState(false);
      const [message, setMessage] = React.useState('');
      const [description, setDescription] = React.useState('');

      React.useEffect(() => {
        fetch('http://localhost:8080/users')
        .then(res => res.json())
        .then(data => setUsers(data))
        .catch(err => console.log(err))
              
      }, [])

    return (
        <div>
          <BookingNavbar user={users.filter(u => u.id === +userId)} users={users}  bookings={bookings} setBookings={setBookings} setAllUsers={setUsers}/>
          {showNotification && <Notification show={showNotification}  message={message} description={description} showNotification={showNotification} setShowNotification={setShowNotification}/>}
          <TravelBookings bookings={bookings} setBookings={setBookings} setShowNotification={setShowNotification} setMessage={setMessage} setDescription={setDescription}/>
        </div>
      )
}

export default Booking
