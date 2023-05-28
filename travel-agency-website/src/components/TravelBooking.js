import React from 'react'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { AiFillEdit } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import BookNowPackageEdit from './BookNowPackageEdit';

const TravelBooking = ({ booking, color, setBookings }) => {
    const [showBookNow, setShowBookNow] = React.useState(false);



    return (
        <>
            {showBookNow && <BookNowPackageEdit show={showBookNow} onHide={() => setShowBookNow(false)} booking={booking} setBookings={setBookings}/>}
            <Card style={{ width: '20rem', backgroundColor: color }}>
                <Card.Body>
                    <Card.Title>{booking.travelPackage.name} <span style={{
                        float: "right"
                    }}><AiFillEdit style={{ margin: "2px" }}
                        onClick={() => {
                            setShowBookNow(true)

                        }}
                        /><MdDelete style={{ margin: "2px" }}
                            onClick={() => {
                                const data = {
                                    userId: booking.customer.id,
                                    packageId: booking.travelPackage.id,
                                }
                                fetch(`https://travel-package-management.herokuapp.com/bookings`, {
                                    method: 'DELETE',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify(data)
                                }).then(() => {
                                    setBookings(prev => prev.filter(b => b.id !== booking.id))
                                })

                            }}
                        /> </span></Card.Title>
                    <Card.Text>Hotel {booking.travelPackage.hotelName}, {booking.travelPackage.destinationCity} {booking.travelPackage.destinationCountry}</Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush" >
                    <ListGroup.Item style={{ backgroundColor: color }}>Departure Date: {booking.departureDate.split("T")[0]}</ListGroup.Item>
                    <ListGroup.Item style={{ backgroundColor: color }}>Booked To: {booking.customer.firstName} {booking.customer.lastName}</ListGroup.Item>
                </ListGroup>

            </Card>
        </>)
}

export default TravelBooking
