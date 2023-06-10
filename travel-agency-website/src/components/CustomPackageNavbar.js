
import React from 'react'
import { Link } from 'react-router-dom'
import { FaUserAlt } from 'react-icons/fa'
import CreateCustomPackageModal from './CreateCustomPackageModal';

const CustomPackageNavbar = ({ user }) => {
    const [modalShow, setModalShow] = React.useState(false);
    const [showUserModal, setShowUserModal] = React.useState(false);


    return (<>
  <CreateCustomPackageModal
            show={modalShow}
            isUpdate={false}
            user={user}
            onHide={() => setModalShow(false)}
        />
        <header className='header'>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: "pointer" }} onClick={() => setShowUserModal(true)}>
                <h2 style={{ color: 'white' }}><FaUserAlt style={{ marginRight: "4px", fontSize: "24px" }} />Hi! {user.firstName}</h2>
            </div>


            <nav className='navbar'>
                <ul>
            <li className='links' style={{ display: "inline" }} onClick={() => setModalShow(true)}> Add Custom Package</li>
                   <Link className='links' to={`/flights/${user.id}`} >
                        Flight
                    </Link>
                   <Link className='links' to={`/home/${user.id}`}>
                        Home
                    </Link>
                    <Link className='links' to={`/booking/${user.id}`} >
                        Booking History
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

export default CustomPackageNavbar
