import React from 'react';
import FlightDetails from './FlightDetails';

function Flights({flights, user, setFlights}) {
    return (
        <div>
            <div className='flights' style={{ display: "flex", justifyContent: "center", gap: "1rem", marginTop: "1rem", flexWrap: "wrap" }}>
                {flights && flights.map((flight) => {
                    return (
                        <FlightDetails user={user} key={flight.id} flight={flight} setFlights={setFlights}/>
                    )
                })}
            </div>

        </div>
    )
}

export default Flights