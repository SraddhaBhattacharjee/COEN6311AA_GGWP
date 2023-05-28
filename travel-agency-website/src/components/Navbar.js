import React from 'react'
import { Link } from 'react-router-dom'
import CreateTravelPackage from './CreateTravelPackage';
import FilterDataModal from './FilterModal';
import { AiFillFilter } from 'react-icons/ai'

const Navbar = ({ user, addTravelPackage, filterTravelPackage }) => {
    const [modalShow, setModalShow] = React.useState(false);
    const [showFilter, setShowFilter] = React.useState(false);

    const handleAddPackage = (p) => {
        setModalShow(false);
        addTravelPackage(p)
    }

    const handleFilterPackage = (p) => {
        setShowFilter(false);
        filterTravelPackage(p)
    }

    return (<>
        <FilterDataModal
            show={showFilter}
            onHide={() => setShowFilter(false)}
            handleFilterPackage={handleFilterPackage}
        />
        <CreateTravelPackage
            show={modalShow}
            onHide={() => setModalShow(false)}
            handleAddPackage={handleAddPackage}
            isUpdate={false}
        />
        <header className='header'>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ color: 'white' }}>Hi! {user.firstName}</h2>
            </div>


            <nav className='navbar'>
                <ul>
                    <li className='links' style={{ display: "inline" }} onClick={() => setShowFilter(true)}> Filter <AiFillFilter /></li>
                    {user && user.type === "AGENT" && (<li className='links' style={{ display: "inline" }} onClick={() => setModalShow(true)}> Add Package</li>)}
                    <Link className='links' to={`/booking/${user.id}`} >
                        Booking History
                    </Link>
                    {user && user.type === "AGENT" && (<Link className='links' to={`/report/${user.id}`}>
                        Travel Report
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
