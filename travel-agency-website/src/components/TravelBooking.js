import React from 'react'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { AiFillEdit } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import BookNowPackageEdit from './BookNowPackageEdit';

const TravelBooking = ({ booking, color, setBookings, setShowNotification, setMessage, setDescription }) => {
    const [showBookNow, setShowBookNow] = React.useState(false);


    return (
        <>
            {showBookNow && <BookNowPackageEdit show={showBookNow} onHide={() => setShowBookNow(false)} booking={booking} setBookings={setBookings} setShowNotification={setShowNotification} setMessage={setMessage} setDescription={setDescription}/>}
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
                                fetch(`http://localhost:8080/bookings`, {
                                    method: 'DELETE',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify(data)
                                }).then(() => {
                                    setBookings(prev => prev.filter(b => b.id !== booking.id))
                                    setShowNotification(true)
                                    setMessage("Package deleted Successfully");
                                    setDescription("Your Package has been deleted successfully. ")
                                })

                            }}
                        /> </span></Card.Title>
                    <Card.Text>Hotel {booking.travelPackage.hotelName}, {booking.travelPackage.destinationCity} {booking.travelPackage.destinationCountry}</Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush" >
                    <ListGroup.Item style={{ backgroundColor: color }}>Departure Date: {booking.departureDate.split("T")[0]}</ListGroup.Item>
                    <ListGroup.Item style={{ backgroundColor: color }}>Booked To: {booking.customer.firstName} {booking.customer.lastName}</ListGroup.Item>
                    {booking.travelPackage.flight && <ListGroup.Item style={{ backgroundColor: color }}>Flight: {booking.travelPackage.flight.name}</ListGroup.Item>}
                </ListGroup>

            </Card>
        </>)
}

export default TravelBooking
