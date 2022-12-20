import React from "react"
import {Link} from 'react-router-dom'
import usersServer from '../../services/users'
import eventsServer from '../../services/events'
import '../css/Login.css'

class Login extends React.Component {
    constructor(props) {
        super(props)

        this.onChangeMail = this.onChangeMail.bind(this)
        this.onChangePass = this.onChangePass.bind(this)
        this.onClickSubmit = this.onClickSubmit.bind(this)

        this.state = {
            email: '',
            password: ''
        }
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
    
    onClickSubmit(e) {
        e.preventDefault()

        const user = {
            email: this.state.email,
            password: this.state.password
        }

        const userLog = async(user) => {
            try {
                const korisnik = await usersServer.loginUser(user)
                window.localStorage.setItem('prijavljeniKorisnik', JSON.stringify(korisnik))

                eventsServer.setToken(korisnik.token)
                window.location='/Event'
            } catch {
                alert('Wrong email or password')
            }
        }
        userLog(user)
    }

    render() {
        return(
            <div className="login-box">
                <h2>Login</h2>
                <form>
                    <div className="user-box">
                    <input className="login-test1" type="email" required
                    value={this.state.email} onChange={this.onChangeMail}/>
                    <label>E-mail</label>
                    </div>
                    <div className="user-box">
                    <input className="login-test2" type="password" required
                    value={this.state.password} onChange={this.onChangePass}/>
                    <label>Password</label>
                    </div>
                    <Link onClick={this.onClickSubmit} className="submit" to='/'>Submit</Link>
                    <Link className="register" to='/Register'>Don't  have an account</Link>
                </form>
            </div>
        )
    }
}

export default Login