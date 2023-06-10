import React, { useEffect, useState } from 'react'
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { FaUserAlt } from 'react-icons/fa'
import UserModal from './UserModal';

function UserDropDown({ users, selectedValue, setSelectedValue, setBookings}) {


    const handleDropdownChange = (eventKey, event) => {
        setSelectedValue(eventKey);
        const user = users.find(user => user.firstName + " " + user.lastName === eventKey);
        if (user && user.id) {
            fetch(`http://localhost:8080/bookings/${user.id}`)
                .then(res => res.json())
                .then(data => {
                    setBookings(data)
                }
                )

        }
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

const BookingNavbar = ({ user, users, bookings, setBookings, setAllUsers }) => {
    const loginUser = user && user.length > 0 ? user[0] : null;
    const [selectedValue, setSelectedValue] = useState(users && users.length > 0 ? users[0].firstName + " " + users[0].lastName : "Select User");
    const [showUserModal, setShowUserModal] = React.useState(false);

    useEffect(() => {
        if (loginUser && loginUser.id && loginUser.type !== "AGENT") {
            fetch(`http://localhost:8080/bookings/${loginUser.id}`)
                .then(res => res.json())
                .then(data => {
                    setBookings(data)
                }
                )
        }
    }, [loginUser, setBookings])


    return (<>
        <UserModal show={showUserModal} onHide={() => setShowUserModal(false)} user={loginUser} setAllUsers={setAllUsers}/>
        <header className='header'>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: "pointer" }} >
                <h2 style={{ color: 'white' }} onClick={() => setShowUserModal(true)}><FaUserAlt style={{ marginRight: "4px", fontSize: "24px" }} />Hi! {user && user.length > 0 && user[0].firstName}</h2>
                {loginUser && loginUser.type === "AGENT" && (<UserDropDown users={users} selectedValue={selectedValue} setSelectedValue={setSelectedValue} setBookings={setBookings} />)}
            </div>



            <nav className='navbar'>
                <ul>

                    {loginUser && loginUser.type === "AGENT" && (<Link className='links' to={`/report/${loginUser.id}`}>
                        Travel Report
                    </Link>)}
                    <Link className='links' to={`/home/${loginUser && loginUser.id}`}>
                        Travel Booking
                    </Link>
                    <Link className='links' to='/'>
                        Log out
                    </Link>
                </ul>
            </nav>
        </header>
    </>
    )
}

export default BookingNavbar
