import React from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function UserModal(props) {
    const [firstName, setFirstName] = React.useState(props.user ? props.user.firstName : '');
    const [lastName, setLastName] = React.useState(props.user ? props.user.lastName : '');
    const [email, setEmail] = React.useState(props.user ? props.user.email : '');
    const [password, setPassword] = React.useState(props.user ? props.user.password : '');
    const [type, setType] = React.useState(props.user ? props.user.type : '');
    const [dob, setDob] = React.useState(props.user ? props.user.dob : '');

    const handleUpdate = (e) => {
        e.preventDefault();
        fetch('http://localhost:8080/users', {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                id: props.user.id,
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                type: type,
                dateOfBirth: dob
            }
            )
        })
            .then(res => res.json())
            .then(data => {
                props.setUser && props.setUser(data);
                props.setAllUsers && props.setAllUsers(...props.users, data);
                props.onHide();
                props.setShowNotification(true)
                props.setMessage("update Successfully");
                props.setDescription("User has been updated successfully.")
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
                        Update User Details

                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicEmail1" className='m-2'>
                            <Form.Control type="text" placeholder={firstName ? firstName : "Enter First Name"} onChange={(e) => setFirstName(e.target.value)} value={firstName} />

                        </Form.Group>

                        <Form.Group controlId="formBasicEmail2" className='m-2'>
                            <Form.Control type="text" placeholder={lastName ? lastName : "Enter Last Name"} onChange={(e) => setLastName(e.target.value)} value={lastName} />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail3" className='m-2'>
                            <Form.Control type="text" placeholder={email ? email : "Enter Email"} onChange={(e) => setEmail(e.target.value)} value={email} />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail4" className='m-2'>
                            <Form.Control type="password" placeholder={password ? password : "Enter Password"} onChange={(e) => setPassword(e.target.value)} value={password} />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail5" className='m-2'>
                            <Form.Control type="text" placeholder={type ? type : "USER"} onChange={(e) => setType(e.target.value)} value={type} disabled />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail6" className='m-2'>
                            <Form.Control type="date" placeholder={dob ? dob : "Enter Date of Birth"} onChange={(e) => setDob(e.target.value)} value={dob} />
                        </Form.Group>



                    </Form>
                </Modal.Body>
                <Modal.Footer>

                    <Button variant="secondary" onClick={props.onHide}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdate}>
                        {props.isUpdate ? "Update Changes" : "Save Changes"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default UserModal;