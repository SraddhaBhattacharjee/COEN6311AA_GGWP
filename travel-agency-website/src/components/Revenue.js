import React from 'react'
import { Card, ListGroup } from 'react-bootstrap';

const Revenue = ({travel, color}) => {
    return (
        <Card style={{ width: '18rem', backgroundColor: color }}>
        <Card.Body>
            <Card.Title>{travel.name} <span style={{
                float: "right"
            }}> </span></Card.Title>
            <Card.Text>Hotel {travel.hotelName}, {travel.destinationCity} {travel.destinationCountry}</Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush" >
            <ListGroup.Item style={{ backgroundColor: color }}>Number Of Bookings: {travel.numBookings}</ListGroup.Item>
            <ListGroup.Item style={{ backgroundColor: color }}>Total Revenue: {travel.totalRevenue}</ListGroup.Item>
        </ListGroup>
    </Card>
    )
}

export default Revenue