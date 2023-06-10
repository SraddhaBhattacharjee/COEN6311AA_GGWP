import React from 'react'
import { Link } from 'react-router-dom'
import { FaUserAlt } from 'react-icons/fa'
import CreateFlightModals from './CreateFlightModals';

const FlightNav = ({user, setFlights}) => {
 const [showCreateFlightModal, setShowCreateFlightModal] = React.useState(false);



    return (<>
        <CreateFlightModals show={showCreateFlightModal} onHide={() => setShowCreateFlightModal(false)} setFlights={setFlights}/>
        <header className='header'>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: "pointer" }}>
                <h2 style={{ color: 'white' }}><FaUserAlt style={{ marginRight: "4px", fontSize: "24px" }} />Hi! {user.firstName}</h2>
            </div>


            <nav className='navbar'>
                <ul>
                {user && user.type === "AGENT" && (<li className='links' style={{ display: "inline" }} onClick={() => setShowCreateFlightModal(true)}> Add Flight</li>)}
                  
                    <Link className='links' to={`/home/${user.id}`} >
                        Home
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

export default FlightNav
