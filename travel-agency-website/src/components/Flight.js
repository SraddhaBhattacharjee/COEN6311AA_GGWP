import React from 'react';
import FlightNav from './FlightNav';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min'
import Flights from './Flights';

function Flight() {
    const location = useLocation();
    const splits = location.pathname.split('/');
    const userId = splits[splits.length - 1];

    const [user, setUser] = React.useState({})
    const [flights, setFlights] = React.useState([])

    React.useEffect(() => {

        fetch(`http://localhost:8080/users/${userId}`)
            .then(res => res.json())
            .then(data => setUser(data))
            .catch(err => console.log(err))

        fetch(`http://localhost:8080/flights`)
            .then(res => res.json())
            .then(data => setFlights(data))
            .catch(err => console.log(err))


    }, [userId])

    return (
        <div>
            <FlightNav user={user} setFlights={setFlights}/>
            <Flights flights={flights} user={user} setFlights={setFlights}/>
        </div>
    )
}

export default Flight;
