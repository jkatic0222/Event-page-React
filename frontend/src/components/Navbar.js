import React from 'react'
import {Link} from 'react-router-dom'
import './css/Navbar.css'

const userLogout = async(e) => {
    e.preventDefault()
    window.localStorage.clear()
    window.location='/'
}

function Navbar() {
    return(
        <header class="header">
            <h1 class="logo"><Link to="/Event">Eventim</Link></h1>
                <ul class="main-nav">
                    <li><Link to="/Event">Events</Link></li>
                    <li><Link to='/Profile'>Profile</Link></li>
                    <li><Link to='/' onClick={userLogout}>LogOut</Link></li>
                </ul>
        </header>
    )
}

export default Navbar