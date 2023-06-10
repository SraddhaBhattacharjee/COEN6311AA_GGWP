import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useLocation } from 'react-router-dom';
import TravelPackages from './TravelPackages';
import Notification from './Notification';


const Home = () => {
  const [travelPackages, setTravelPackages] = useState([])
  const location = useLocation();
  const splits = location.pathname.split('/');
  const userId = splits[splits.length - 1];
  const [user, setUser] = React.useState(location.state || {});
  const [showNotification, setShowNotification] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [description, setDescription] = React.useState('');


  useEffect(() => {
    fetch('http://localhost:8080/packages')
      .then(res => res.json())
      .then(data => setTravelPackages(data))
      .catch(err => console.log(err))
    if (!user.hasOwnProperty("id")) {
      fetch(`http://localhost:8080/users/${userId}`)
        .then(res => res.json())
        .then(data => setUser(data))
        .catch(err => console.log(err))
    }

  }, [user, userId]);

  const addTravelPackage = (travelPackage) => {
    setTravelPackages([...travelPackages, travelPackage])
  }

  const deleteTravelPackage = (id) => {
    fetch(`http://localhost:8080/packages/${id}`, {
      method: 'DELETE'
    })
      .then(data => {
        const updatedTravelPackages = travelPackages.filter((travel) => travel.id !== id)
        setTravelPackages(updatedTravelPackages);
        setShowNotification(true);
        setMessage('Travel Package Deleted');
        setDescription('Travel Package Deleted Successfully');
      })
      .catch(err => console.log(err))


  }


  const updateTravelPackage = (travelPackage) => {
    const updatedTravelPackages = travelPackages.map((travel) => {
      if (travel.id === travelPackage.id) {
        return travelPackage;
      }
      return travel;
    })
    setTravelPackages(updatedTravelPackages);
  }

  const filterTravelPackage = (travelPackage) => {
    setTravelPackages(travelPackage);
  }


  return (
    <div>
      <Navbar user={user} addTravelPackage={addTravelPackage} filterTravelPackage={filterTravelPackage} setUser={setUser} setShowNotification={setShowNotification} setMessage={setMessage} setDescription={setDescription}/>
      {showNotification && <Notification show={showNotification}  message={message} description={description} showNotification={showNotification} setShowNotification={setShowNotification}/>}
      <TravelPackages user={user} travelPackages={travelPackages} updateTravelPackage={updateTravelPackage} deleteTravelPackage={deleteTravelPackage} setShowNotification={setShowNotification} setMessage={setMessage} setDescription={setDescription} />
    </div>
  )
}

export default Home
