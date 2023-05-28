import React from 'react'
import TravelBooking from './TravelBooking'

const TravelBookings = ({ bookings, setBookings }) => {
    const lightColors = [
        "#FFD9D9",
        "#FFD9FF",
        "#E6D9FF",
        "#D9E6FF",
        "#D9F2FF",
        "#D9FFFF",
        "#D9FFE6",
    ];



    return (
        <div>
            <div className='travel-packages' style={{ display: "flex", justifyContent: "center", gap: "1rem", marginTop: "1rem", flexWrap: "wrap" }}>
                {bookings.length === 0 && <h1>No Bookings</h1>}
                {bookings.map((booking) => {
                    return (
                        <TravelBooking key={booking.id} booking={booking} color={lightColors[Math.floor(Math.random() * lightColors.length)]} setBookings={setBookings}/>
                    )
                })}
            </div>

        </div>
    )
}

export default TravelBookings
