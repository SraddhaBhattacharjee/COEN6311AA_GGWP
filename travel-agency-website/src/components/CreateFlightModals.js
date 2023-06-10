import React from 'react';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function CreateFlightModals(props) {
    const [name, setName] = useState(props.flight ? props.flight.name : '');
    const [cost, setCost] = useState(props.flight ? props.flight.cost : '');
    const [source, setSource] = useState(props.flight ? props.flight.source : '');
    const [destination, setDestination] = useState(props.flight ? props.flight.destination : '');

    const handleSubmit = (e) => {
        e.preventDefault();
        const flight = { name, cost, source, destination };
        fetch('http://localhost:8080/flights', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(flight)
        }).then(() => {
            props.onHide();
            props.setFlights(prev => [...prev, flight]);
        }
        )

    }

    const handleUpdate = (e) => {
        e.preventDefault();
        const flight = { id: props.flight.id, name, cost, source, destination };
        fetch('http://localhost:8080/flights', {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(flight)
        }).then(() => {
            props.onHide();
            props.setFlights(prev => prev.map(f => f.id === flight.id ? flight : f));
        }
        )
    }

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
                        Add Flight

                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicEmail1" className='m-2'>
                            <Form.Control type="text" placeholder={name ? name : "Enter Flight Name"} onChange={(e) => setName(e.target.value)}
                                value={name}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmai2l" className='m-2'>
                            <Form.Control type="number" placeholder={cost ? cost : "Enter Cost"}
                                onChange={(e) => setCost(e.target.value)} value={cost} />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail3" className='m-2'>
                            <Form.Control type="text" placeholder={source ? source : "Enter Source"}
                                onChange={(e) => setSource(e.target.value)} value={source} min="0" />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail4" className='m-2'>
                            <Form.Control type="text" placeholder={
                                destination ? destination : "Enter Destination"
                            } onChange={(e) => setDestination(e.target.value)} value={destination} min="0" />
                        </Form.Group>



                    </Form>
                </Modal.Body>
                <Modal.Footer>

                    <Button variant="secondary" onClick={props.onHide}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={props.isUpdate ? handleUpdate : handleSubmit}>
                        {props.isUpdate ? "Update Changes" : "Save Changes"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CreateFlightModals;