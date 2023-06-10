import React from "react";
import { Card, ListGroup } from "react-bootstrap";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import f1 from '../assets/f1.jpg'
import f2 from '../assets/f2.jpg'
import f3 from '../assets/f3.jpg'
import f4 from '../assets/f4.jpg'
import CreateFlightModals from "./CreateFlightModals";

function FlightDetails({ flight, user, setFlights }) {
    const images = [f1, f2, f3, f4];
    const [fileName, setFileName] = React.useState(images[Math.floor(Math.random() * images.length)]);
    const [showCreateFlightModal, setShowCreateFlightModal] = React.useState(false);
    const [focusFlight, setFocusFlight] = React.useState(false);
    return (
        <>
            <CreateFlightModals show={showCreateFlightModal} onHide={() => setShowCreateFlightModal(false)} setFlights={setFlights} flight={flight} isUpdate={true} />
            <Card style={{ width: '20rem', border: focusFlight && '2px solid blue' }} onClick={() => setFocusFlight(true)}>
                <Card.Body>
                    <Card.Title>{flight.name} <span style={{
                        float: "right"
                    }}>
                        {user && user.type === "AGENT" && (<AiFillEdit style={{ margin: "2px" }}
                        onClick={() => {
                            setShowCreateFlightModal(true)
                        }}
                        />)}
                        {user && user.type === "AGENT" && (<MdDelete style={{ margin: "2px" }}
                            onClick={() => {
                                fetch(`http://localhost:8080/flights/${flight.id}`, {
                                    method: 'DELETE',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                }).then(() => {
                                    setFlights(prev => prev.filter(f => f.id !== flight.id))
                                }
                                )

                            }}
                        />)} </span></Card.Title>
                    <img src={fileName} alt='flight' height="300px" width="500px" />
                </Card.Body>
                <ListGroup className="list-group-flush" >
                    <ListGroup.Item >Source: {flight.source}</ListGroup.Item>
                    <ListGroup.Item >Destination: {flight.destination}</ListGroup.Item>
                    <ListGroup.Item >Price: {flight.cost} CAD</ListGroup.Item>
                </ListGroup>

            </Card></>
    )
}

export default FlightDetails
