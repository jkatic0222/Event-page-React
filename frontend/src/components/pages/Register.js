import React from "react"
import {Link} from 'react-router-dom'
import usersServer from '../../services/users'
import eventsServer from '../../services/events'
import '../css/Login.css'

class Register extends React.Component {
    constructor(props) {
        super(props)

        this.onChangeUsername = this.onChangeUsername.bind(this)
        this.onChangeMail = this.onChangeMail.bind(this)
        this.onChangePass = this.onChangePass.bind(this)
        this.onChangePass2 = this.onChangePass2.bind(this)
        this.onClickRegister = this.onClickRegister.bind(this)

        this.state = {
            username: '',
            email: '',
            password: '',
            password2: ''
        }
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }
    onChangeMail(e) {
        this.setState({
            email: e.target.value
        })
    }
    onChangePass(e) {
        this.setState({
            password: e.target.value
        })
    }
    onChangePass2(e) {
        this.setState({
            password2: e.target.value
        })
    }

    onClickRegister(e) {
        e.preventDefault()

        const newUser = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
        }
        var flag = true
        if(newUser.username.length < 3) {
            flag = false
            alert('Username to short (minimum 3 characters)')
        }
        else if(!newUser.email.includes("@")) {
            flag = false
            alert('Wrong email format')
        }
        else if(newUser.password.length < 4) {
            flag = false
            alert('Password to short (minimum 4 characters)')
        }
        else if(this.state.password2 != newUser.password) {
            flag = false
            alert('Passwords do not match')
        }
        const userAdd = async(user) => {
            try {
                const korisnik = await usersServer.addUser(user)
                window.localStorage.setItem('prijavljeniKorisnik', JSON.stringify(korisnik))

                eventsServer.setToken(korisnik.token)
                window.location="/Event"
            } catch {
                alert('User already exists')
            }
        }
        if(flag){
            userAdd(newUser)
        }
    }

    render() {
        return(
            <div className="login-box">
                <h2>Register</h2>
                <form>
                    <div className="user-box">
                    <input type="text" required
                    value={this.state.username} onChange={this.onChangeUsername}/>
                    <label>Username</label>
                    </div>
                    <div className="user-box">
                    <input className="email-test" type="email" required
                    value={this.state.email} onChange={this.onChangeMail}/>
                    <label>E-mail</label>
                    </div>
                    <div className="user-box">
                    <input type="password" required
                    value={this.state.password} onChange={this.onChangePass}/>
                    <label>Password</label>
                    </div>
                    <div className="user-box">
                    <input type="password" required
                    value={this.state.password2} onChange={this.onChangePass2}/>
                    <label>Confirm password</label>
                    </div>
                    <Link onClick={this.onClickRegister} className="submit" to='/Register'>Submit</Link>
                </form>
            </div>
        )
    }
}

export default Register