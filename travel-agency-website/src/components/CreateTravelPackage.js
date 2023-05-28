import React from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function CreateTravelPackage(props) {
    const [packageName, setPackageName] = React.useState(props.travel ? props.travel.name : '');
    const [hotel, setHotel] = React.useState(props.travel ? props.travel.hotelName : '');
    const [days, setDays] = React.useState(props.travel ? props.travel.numberOfDays : '');
    const [nights, setNights] = React.useState(props.travel ? props.travel.numberOfNights : '');
    const [city, setCity] = React.useState(props.travel ? props.travel.destinationCity : '');
    const [country, setCountry] = React.useState(props.travel ? props.travel.destinationCountry : '');
    const [price, setPrice] = React.useState(props.travel ? props.travel.price : '');

    const handleUpdate = (e) => {
        e.preventDefault();
        fetch('https://travel-package-management.herokuapp.com/packages', {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                name: packageName,
                hotelName:  hotel,
                numberOfDays: days,
                numberOfNights: nights,
                destinationCity: city,
                destinationCountry: country,
                price,
                id: props.travel.id
            })
        })
            .then(res => res.json())
            .then(data => {
                props.handleUpdatePackage(data);
                props.onHide();
            })
            .catch(err => console.log(err))
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('https://travel-package-management.herokuapp.com/packages', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                name: packageName,
                hotelName:  hotel,
                numberOfDays: days,
                numberOfNights: nights,
                destinationCity: city,
                destinationCountry: country,
                price
            })
        })
            .then(res => res.json())
            .then(data => {
                props.handleAddPackage(data);
                props.onHide();
            })
            .catch(err => console.log(err))
    }


    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                {props.isUpdate ? "Update Travel Package": "Create New Travel Package"}

                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formBasicEmail" className='m-2'>
                        <Form.Control type="text" placeholder={packageName ? packageName :"Enter package"} onChange={(e) => setPackageName(e.target.value)} 
                        value={packageName}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail" className='m-2'>
                        <Form.Control type="text" placeholder={hotel ? hotel : "Enter Hotel"}
                        onChange={(e) => setHotel(e.target.value)} value={hotel} />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail" className='m-2'>
                        <Form.Control type="number" placeholder={days ? days : "Enter number of days"}
                         onChange={(e) => setDays(e.target.value)} value={days} min="0"/>
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail" className='m-2'>
                        <Form.Control type="number" placeholder={
                            nights ? nights : "Enter number of nights"
                        } onChange={(e) => setNights(e.target.value)} value={nights} min="0"/>
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail" className='m-2'>
                        <Form.Control type="text" placeholder={
                            city ? city : "Enter city"
                        } onChange={(e) => setCity(e.target.value)} value={city} />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail" className='m-2'>
                        <Form.Control type="text" placeholder={
                            country ? country : "Enter country"
                        } onChange={(e) => setCountry(e.target.value)} value={country} />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail" className='m-2'>
                        <Form.Control type="number" placeholder={
                            price ? price : "Enter price"
                        } onChange={(e) => setPrice(e.target.value)} value={price} min="0"/>
                    </Form.Group>



                </Form>
            </Modal.Body>
            <Modal.Footer>

                <Button variant="secondary" onClick={props.onhide}>
                    Close
                </Button>
                <Button variant="primary" onClick={props.isUpdate? handleUpdate: handleSubmit}>
                   {props.isUpdate ? "Update Changes": "Save Changes"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CreateTravelPackage;