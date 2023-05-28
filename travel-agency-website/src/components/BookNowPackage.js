import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';

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
            userId : users.find(user => user.firstName + " " + user.lastName === selectedValue).id,
            packageId : props.travel.id
        }
        fetch('https://travel-package-management.herokuapp.com/bookings', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
    }



    useEffect(() => {
        fetch('https://travel-package-management.herokuapp.com/users')
            .then(res => res.json())
            .then(data => setUsers(data), () => {
                setSelectedValue(users[0].firstName + " " + users[0].lastName)
            })
            .catch(err => console.log(err))
    }, []);


    return (
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

                    <UserDropDown users={users} selectedValue={selectedValue} setSelectedValue={setSelectedValue} />

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
                <Button variant="primary" onClick={() => {
                    props.onHide();
                    handleSave();
                }}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default BookNowPackage;