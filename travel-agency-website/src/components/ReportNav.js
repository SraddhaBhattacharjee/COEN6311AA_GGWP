import React from 'react'
import { Link } from 'react-router-dom'

const ReportNav = ({ user }) => {


    return (<>

        <header className='header'>
            <div>
                <h2 style={{ color: 'white' }}>Hi! {user.firstName}</h2>
            </div>

            <nav className='navbar'>
                <ul>
                    <Link className='links' to='/booking' >
                        Booking History
                    </Link>
                    <Link className='links' to= {`/home/${user.id}`}>
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
