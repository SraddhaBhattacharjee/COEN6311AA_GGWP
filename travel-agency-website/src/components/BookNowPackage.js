import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import Stripe from "react-stripe-checkout";

function UserDropDown({ users, selectedValue, setSelectedValue }) {



    const handleDropdownChange = (eventKey, event) => {
        setSelectedValue(eventKey);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Dropdown onSelect={handleDropdownChange} className='m-2 '>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                    {selectedValue}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {users.map((user) => (
                        <Dropdown.Item key={user.id} eventKey={user.firstName + " " + user.lastName}>{user.firstName + " " + user.lastName}</Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
}

function BookNowPackage(props) {
    const [users, setUsers] = React.useState([]);
    const [packageName] = React.useState(props.travel ? props.travel.name : '');
    const [destinationDate, setDestinationDate] = React.useState('');
    const [selectedValue, setSelectedValue] = useState('Select User');

    const handleSave = () => {
        const data = {
            departureDate: destinationDate,
            userId: users.find(user => user.firstName + " " + user.lastName === selectedValue).id,
            packageId: props.travel.id
        }
        fetch('http://localhost:8080/bookings', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                props.setShowNotification(true)
                props.setMessage("Package Booked Successfully");
                props.setDescription("Enjoy! Your Package has been booked successfully. ")
            })
    }

    async function handleToken(token) {
        const data = {
            departureDate: destinationDate,
            userId: users.find(user => user.firstName + " " + user.lastName === selectedValue).id,
            packageId: props.travel.id
        }

        fetch(`http://localhost:8080/bookings/charge`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                token: token.id,
                amount: +props.travel.price,
            },
            body: JSON.stringify(data),
        }

        )
            .then(res => res.json())
            .then(data => {
                console.log(data)
                props.setShowNotification(true)
                props.onHide();
                props.setMessage("Package Booked Successfully");
                props.setDescription("Enjoy! Your Package has been booked successfully. ")

            })
            .catch(err => console.log(err))

    }



    useEffect(() => {
        fetch('http://localhost:8080/users')
            .then(res => res.json())
            .then(data => setUsers(data), () => {
                setSelectedValue(users[0].firstName + " " + users[0].lastName)
            })
            .catch(err => console.log(err))
    }, []);


    return (
        <>
            <Modal
                {...props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Book {packageName} Package

                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>

                        {props.user && props.user.type === "AGENT" && <UserDropDown users={users} selectedValue={selectedValue} setSelectedValue={setSelectedValue} />}
                        <Form.Group controlId="formBasicEmail" className='m-2'>
                            <Form.Control type="date" placeholder={destinationDate ? destinationDate : "Enter number Departure Date"} onChange={(e) => setDestinationDate(e.target.value)} value={destinationDate} />

                        </Form.Group>



                    </Form>
                </Modal.Body>
                <Modal.Footer>

                    <Button variant="secondary" onClick={() => {
                        props.onHide();
                    }}>
                        Close
                    </Button>
                    <Stripe
                        stripeKey="pk_test_51NDAmHCpcQMR8x5qndw3aa6AYJTB1StlEMfYpZmyP1RJgOrHmnr5cMIdDZtkhgFbypSH9B0TQSWZgxopDLHwWNZ900O0cTIEWk"
                        token={handleToken}

                    />
                </Modal.Footer>
            </Modal></>
    );
}

export default BookNowPackage;