import React from 'react';
import { Dropdown, Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function CreateCustomPackageModal(props) {
    const [packageName, setPackageName] = React.useState(props.travel ? props.travel.name : '');
    const [hotel, setHotel] = React.useState(props.travel ? props.travel.hotelName : '');
    const [days, setDays] = React.useState(props.travel ? props.travel.numberOfDays : '');
    const [nights, setNights] = React.useState(props.travel ? props.travel.numberOfNights : '');
    const [city, setCity] = React.useState(props.travel ? props.travel.destinationCity : '');
    const [country, setCountry] = React.useState(props.travel ? props.travel.destinationCountry : '');
    const [price, setPrice] = React.useState(props.travel ? props.travel.price : '100');
    const [flights, setFlights] = React.useState([]);
    const [selectedValue, setSelectedValue] = React.useState(props.travel && props.travel.flight ? props.travel.flight.name : "");
    const [flightId, setFlightId] = React.useState('');

    React.useEffect(() => {
        fetch('http://localhost:8080/flights')
            .then(res => res.json())
            .then(data => {
                setFlights(data);
                setSelectedValue(data.length > 0 ? data[0].name : "Select Flight")
            })
            .catch(err => console.log(err))
    }, [])


    function FlightDropDown({ flights, selectedValue, setSelectedValue }) {


        const handleDropdownChange = (eventKey, event) => {
            setSelectedValue(eventKey);
            const flight = flights.find(flight => flight.name === eventKey);
            if (flight && flight.id) {
                setFlightId(flight.id);
                setPrice(parseInt(flight.cost) + parseInt(price))
            }
        };

        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Dropdown onSelect={handleDropdownChange} className='m-2 '>
                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                        {selectedValue}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {flights.map((flight) => (
                            <Dropdown.Item key={flight.id} eventKey={flight.name}>{flight.name}</Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        );
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        fetch('http://localhost:8080/packages', {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                name: packageName,
                hotelName: hotel,
                numberOfDays: days,
                numberOfNights: nights,
                destinationCity: city,
                destinationCountry: country,
                price,
                id: props.travel.id,
                flightId,
                userId: props.user.id
            })
        })
            .then(res => res.json())
            .then(data => {
                props.handleUpdatePackage(data);
                props.onHide();
                props.setShowNotification(true)
                props.setMessage("Package updated Successfully");
                props.setDescription("Enjoy! Your Package has been updated successfully. ")
            })
            .catch(err => console.log(err))
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:8080/packages', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                name: packageName,
                hotelName: hotel,
                numberOfDays: days,
                numberOfNights: nights,
                destinationCity: city,
                destinationCountry: country,
                price,
                flightId,
                userId: props.user.id
            })
        })
            .then(res => res.json())
            .then(data => {
                props.handleAddPackage(data);
                props.onHide();
                props.setShowNotification(true)
                props.setMessage("Package created Successfully");
                props.setDescription("Enjoy! Your Package has been created successfully. ")
            })
            .catch(err => console.log(err))
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
                        Create Your own Custom Package

                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicEmail" className='m-2'>
                            <Form.Control type="text" placeholder={packageName ? packageName : "Enter package"} onChange={(e) => setPackageName(e.target.value)}
                                value={packageName}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail" className='m-2'>
                            <Form.Control type="text" placeholder={hotel ? hotel : "Enter Hotel"}
                                onChange={(e) => setHotel(e.target.value)} value={hotel} />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail" className='m-2'>
                            <Form.Control type="number" placeholder={days ? days : "Enter number of days"}
                                onChange={(e) => setDays(e.target.value)} value={days} min="0" />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail" className='m-2'>
                            <Form.Control type="number" placeholder={
                                nights ? nights : "Enter number of nights"
                            } onChange={(e) => setNights(e.target.value)} value={nights} min="0" />
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
                                price ? price : "Total price"
                            } value={price} min="0" disabled={true} />
                        </Form.Group>
                        <FlightDropDown flights={flights} selectedValue={selectedValue} setSelectedValue={setSelectedValue} />



                    </Form>
                </Modal.Body>
                <Modal.Footer>

                    <Button variant="secondary" onClick={props.onhide}>
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

export default CreateCustomPackageModal;