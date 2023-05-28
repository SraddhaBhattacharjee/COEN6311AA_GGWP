import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useLocation } from 'react-router-dom';
import TravelPackages from './TravelPackages';


const Home = () => {
  const [travelPackages, setTravelPackages] = useState([])
  const location = useLocation();
  const splits = location.pathname.split('/');
  const userId = splits[splits.length - 1];
  const [user, setUser] = React.useState(location.state || {});


  useEffect(() => {
    fetch('https://travel-package-management.herokuapp.com/packages')
      .then(res => res.json())
      .then(data => setTravelPackages(data))
      .catch(err => console.log(err))
    if (!user.hasOwnProperty("id")) {
      fetch(`https://travel-package-management.herokuapp.com/users/${userId}`)
        .then(res => res.json())
        .then(data => setUser(data))
        .catch(err => console.log(err))
    }

  }, [user, userId]);

  const addTravelPackage = (travelPackage) => {
    setTravelPackages([...travelPackages, travelPackage])
  }

  const deleteTravelPackage = (id) => {
    fetch(`https://travel-package-management.herokuapp.com/packages/${id}`, {
      method: 'DELETE'
    })
      .then(data => {
        const updatedTravelPackages = travelPackages.filter((travel) => travel.id !== id)
        setTravelPackages(updatedTravelPackages);
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
      <Navbar user={user} addTravelPackage={addTravelPackage} filterTravelPackage={filterTravelPackage}/>
      <TravelPackages user={user} travelPackages={travelPackages} updateTravelPackage={updateTravelPackage} deleteTravelPackage={deleteTravelPackage} />
    </div>
  )
}

export default Home
