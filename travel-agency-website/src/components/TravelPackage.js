import React from 'react'
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { AiFillEdit } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import CreateTravelPackage from './CreateTravelPackage';
import BookNowPackage from './BookNowPackage';
import { MdFlight } from 'react-icons/md'
import { WiDayLightWind } from 'react-icons/wi'
import { MdModeNight } from 'react-icons/md'
import { RiMoneyDollarBoxFill } from 'react-icons/ri'



const TravelPackage = ({ travel, color, updateTravelPackage, deleteTravelPackage, user, setShowNotification, setMessage, setDescription }) => {
    const [modalShow, setModalShow] = React.useState(false);
    const [showBookNow, setShowBookNow] = React.useState(false);



    const handleUpdatePackage = (p) => {
        setModalShow(false);
        updateTravelPackage(p)
    }


    return (
        <>
            {showBookNow && <BookNowPackage show={showBookNow} onHide={() => setShowBookNow(false)} travel={travel} user={user} setShowNotification={setShowNotification} setMessage={setMessage} setDescription={setDescription} />}


            <CreateTravelPackage
                show={modalShow}
                onHide={() => setModalShow(false)}
                isUpdate={true}
                travel={travel}
                handleUpdatePackage={handleUpdatePackage}
                setShowNotification={setShowNotification} setMessage={setMessage} setDescription={setDescription}
            />
            <Card style={{ width: '18rem', backgroundColor: color }}>
                <Card.Body>
                    <Card.Title>{travel.name} <span style={{
                        float: "right"
                    }}>
                        {user && user.type === "AGENT" &&
                            <AiFillEdit style={{ margin: "2px" }}
                                onClick={() => {
                                    setModalShow(true);
                                }}
                            />}
                        {user && user.type === "AGENT" && <MdDelete style={{ margin: "2px" }}
                            onClick={() => {
                                deleteTravelPackage(travel.id)
                            }}
                        />}</span></Card.Title>
                    <Card.Text>Hotel {travel.hotelName}, {travel.destinationCity} {travel.destinationCountry}</Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush" >
                    <ListGroup.Item style={{ backgroundColor: color }}><WiDayLightWind /> Number Of Days: {travel.numberOfDays}</ListGroup.Item>
                    <ListGroup.Item style={{ backgroundColor: color }}><MdModeNight /> Number Of Nights: {travel.numberOfNights}</ListGroup.Item>
                    <ListGroup.Item style={{ backgroundColor: color }}><RiMoneyDollarBoxFill /> Price: {travel.price} CAD</ListGroup.Item>
                    {travel.flight && (<ListGroup.Item style={{ backgroundColor: color }}><MdFlight />Flight: {travel.flight.name} </ListGroup.Item>)}
                </ListGroup>
                <Card.Body style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Button variant="primary btn-block btn-lg" style={{ width: "100%" }}
                        onClick={() => {
                            setShowBookNow(true);
                        }
                        }
                    >Book Now</Button>
                </Card.Body>
            </Card>
        </>)
}

export default TravelPackage
