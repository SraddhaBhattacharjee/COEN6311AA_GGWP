import React from 'react'
import { Link } from 'react-router-dom'
import UserModal from './UserModal';
import { FaUserAlt } from 'react-icons/fa'

const ReportNav = ({ user, setUser, setShowNotification, setMessage, setDescription }) => {
    const [showUserModal, setShowUserModal] = React.useState(false);

    return (<>
        <UserModal
            show={showUserModal}
            onHide={() => setShowUserModal(false)}
            user={user}
            setUser={setUser}
            setShowNotification={setShowNotification} setMessage={setMessage} setDescription={setDescription}
        />
        <header className='header' style={{ cursor: "pointer" }} onClick={() => setShowUserModal(true)}>
            <div>
                <h2 style={{ color: 'white' }}><FaUserAlt style={{ marginRight: "4px", fontSize: "24px" }} />Hi! {user.firstName}</h2>
            </div>

            <nav className='navbar'>
                <ul>
                    <Link className='links' to='/booking' >
                        Booking History
                    </Link>
                    <Link className='links' to={`/home/${user.id}`}>
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

export default ReportNav;
