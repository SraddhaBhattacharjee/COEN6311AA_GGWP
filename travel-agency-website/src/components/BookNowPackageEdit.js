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

function BookNowPackageEdit(props) {
    const { booking, setBookings } = props;
    const [users, setUsers] = React.useState([]);
    const [packageName] = React.useState(props.travel ? props.travel.name : '');
    const [destinationDate, setDestinationDate] = React.useState('');
    const [selectedValue, setSelectedValue] = useState('Select User');

    const handleSave = () => {
        const data = {
            departureDate: destinationDate,
            userId : users.find(user => user.firstName + " " + user.lastName === selectedValue).id,
            packageId : booking.travelPackage.id,
            id : booking.id
        }
        fetch('http://localhost:8080/bookings', {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                props.setShowNotification(true)
                props.setMessage("Package edited Successfully");
                props.setDescription("Enjoy! Your Package has been edited successfully. ")
                setBookings(prev => {
                    const index = prev.findIndex(booking => booking.id === data.id);
                    prev[index] = data;
                    return [...prev];
                })
            })
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
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  Update Book {packageName} Package

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
                    console.log("Hi")
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

export default BookNowPackageEdit;