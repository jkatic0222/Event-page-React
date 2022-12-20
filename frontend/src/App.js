import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom' // Switch = Routes

import './App.css'
import Navbar from './components/Navbar.js'
import Login from './components/pages/Login.js'
import Register from './components/pages/Register.js'
import Profile from './components/pages/Profile.js'
import Event from './components/pages/Events.js'

const App = (props) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const logUser = window.localStorage.getItem('prijavljeniKorisnik')
        if(logUser) {
            const user = JSON.parse(logUser)

            setUser(user)
        }
    }, [])

    return(
        <div>
            <Router>
                {user === null
                ?<div>
                    <Routes>
                        <Route path='/' exact element={<Login/>}/>
                        <Route path='/Register' exact element={<Register/>}/>
                    </Routes>
                </div>
                :<div>
                    <Navbar/>
                    <Routes>
                        <Route path='/Profile' exact element={<Profile/>}/>
                        <Route path='/Event' exact element={<Event/>}/>
                    </Routes>
                </div>
                }
            </Router>
        </div>
    )
}

export default App