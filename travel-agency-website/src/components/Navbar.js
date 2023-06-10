import React from 'react'
import { Link } from 'react-router-dom'
import CreateTravelPackage from './CreateTravelPackage';
import FilterDataModal from './FilterModal';
import { AiFillFilter } from 'react-icons/ai'
import { FaUserAlt } from 'react-icons/fa'
import UserModal from './UserModal';

const Navbar = ({ user, addTravelPackage, filterTravelPackage, setUser, setShowNotification, setMessage, setDescription }) => {
    const [modalShow, setModalShow] = React.useState(false);
    const [showFilter, setShowFilter] = React.useState(false);
    const [showUserModal, setShowUserModal] = React.useState(false);

    const handleAddPackage = (p) => {
        setModalShow(false);
        addTravelPackage(p)
    }

    const handleFilterPackage = (p) => {
        setShowFilter(false);
        filterTravelPackage(p)
    }

    return (<>
        <UserModal
            show={showUserModal}
            onHide={() => setShowUserModal(false)}
            user={user}
            setUser={setUser}
            setShowNotification={setShowNotification} setMessage={setMessage} setDescription={setDescription}
        />

        <FilterDataModal
            show={showFilter}
            onHide={() => setShowFilter(false)}
            handleFilterPackage={handleFilterPackage}
            setShowNotification={setShowNotification} setMessage={setMessage} setDescription={setDescription}
        />
        <CreateTravelPackage
            show={modalShow}
            onHide={() => setModalShow(false)}
            handleAddPackage={handleAddPackage}
            isUpdate={false}
            setShowNotification={setShowNotification} setMessage={setMessage} setDescription={setDescription}
        />
        <header className='header'>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: "pointer" }} onClick={() => setShowUserModal(true)}>
                <h2 style={{ color: 'white' }}><FaUserAlt style={{ marginRight: "4px", fontSize: "24px" }} />Hi! {user.firstName}</h2>
            </div>


            <nav className='navbar'>
                <ul>
                    <li className='links' style={{ display: "inline" }} onClick={() => setShowFilter(true)}> Filter <AiFillFilter /></li>
                     <Link className='links' to={`/flights/${user.id}`} >
                        Flight
                    </Link>
                    {user && user.type === "AGENT" && (<li className='links' style={{ display: "inline" }} onClick={() => setModalShow(true)}> Add Package</li>)}
                    <Link className='links' to={`/booking/${user.id}`} >
                        Booking History
                    </Link>
                    {user && user.type === "AGENT" && (<Link className='links' to={`/report/${user.id}`}>
                        Travel Report
                    </Link>)}
                    {user && user.type !== "AGENT" && ( <Link className='links' to={`/customPackages/${user.id}`}>
                        Custom Package
                    </Link>)}
                  
                    <Link className='links' to='/'>
                        Log out
                    </Link>
                </ul>
            </nav>
        </header>
    </>
    )
}

export default Navbar
