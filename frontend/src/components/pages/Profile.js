import React from "react"
import eventsServer from '../../services/events'
import usersServer from '../../services/users'
import '../css/Item-box.css'

class Profile extends React.Component {
    constructor(props) {
        super(props)

        //addEvent
        this.onChangeName = this.onChangeName.bind(this)
        this.onChangeType = this.onChangeType.bind(this)
        this.onChangeLocation = this.onChangeLocation.bind(this)
        this.onChangeDate = this.onChangeDate.bind(this)
        this.onChangeDescription = this.onChangeDescription.bind(this)
        this.onClickSave = this.onClickSave.bind(this)

        //updateUser
        this.onChangeNumber = this.onChangeNumber.bind(this)
        this.onChangeUserLocation = this.onChangeUserLocation.bind(this)
        this.UserUpdate = this.UserUpdate.bind(this)

        //updateEvent
        this.eventDelete = this.eventDelete.bind(this)
        this.updateEvent = this.updateEvent.bind(this)

        this.state = {
            //event
            eventid: '',
            name: '',
            type: '',
            eventlocation: '',
            date: new Date(),
            description: '',
            //user
            userId: '',
            username: '',
            email: '',
            number: '',
            location: ''
        }
    }

    componentDidMount() {
        const email = JSON.parse(window.localStorage.getItem('prijavljeniKorisnik')).data.email
        
        usersServer.getAll().then(res => {
            res.forEach(el => {
                if(el.email === email) {
                    this.setState({
                        userId: el._id,
                        username: el.username,
                        email: email,
                        number: el.number,
                        location: el.location
                    })
                }                
            });
        })

        eventsServer.getAll().then(res => {
            var list = document.getElementById('ul-event')
            res.forEach(el => {
                if(this.state.userId === el.user) {

                    var idSpam = document.createElement('spam')
                    idSpam.id = 'event-name'// + el._id
                    idSpam.innerText = el.name
                    var locSpam = document.createElement('spam')
                    var date = el.date.toString()
                    var day = date.substring(8,10)
                    var month = date.substring(5,7)
                    var year = date.substring(0,4)
                    var loc = el.location
                    locSpam.innerText = '['+day+'.'+month+'.'+year+' '+loc+']'
                    
                    var a = document.createElement('a')
                    a.className = 'event-btn'
                    a.id = 'event-btn'
                    a.href = 'Profile#edit-event'
                    a.innerText = 'edit'
                    a.addEventListener('click', function(e){

                       this.setState({
                        eventid: el._id,
                        name: el.name,
                        type: el.type,
                        eventlocation: el.location,
                        date: el.date.substring(0,10),
                        description: el.description
                       })
                    }.bind(this))

                    var div1 = document.createElement('div')
                    div1.appendChild(idSpam)
                    div1.appendChild(locSpam)
                    div1.appendChild(a)

                    var typeSpam = document.createElement('spam')
                    typeSpam.innerText = el.type

                    var descSpam = document.createElement('spam')
                    descSpam.innerText = el.description

                    var br = document.createElement('br')

                    var div2 = document.createElement('div')
                    div2.className = 'div2'
                    div2.appendChild(typeSpam)
                    div2.appendChild(br)
                    div2.appendChild(descSpam)

                    var li = document.createElement('li')
                    li.appendChild(div1)
                    li.appendChild(div2)
                    list.appendChild(li)
                }
            });           
        })
    }

    eventDelete(e) {
        e.preventDefault()

        eventsServer.deleteEvent(this.state.eventid).then(response => {
            window.confirm('Event deleted')
            if (window.confirm) (
                window.location = '/Profile'
            )
        })
        
    }

    updateEvent(e) {
        e.preventDefault()

        const newData = {
            id: this.state.eventid,
            name: this.state.name,
            type: this.state.type,
            location: this.state.eventlocation,
            date: this.state.date,
            description: this.state.description
        }
        var flag = true
        if(newData.name.length < 3) {
            flag = false
            alert('Event name length to short (minimum 3 characters)')
        }
        else if(newData.type == '' || newData.type == '--') {
            flag = false
            alert('Choose event type')
        }
        else if(newData.location.length < 1) {
            flag = false
            alert('Input location')
        }

        if (flag) {
            eventsServer.updateEvent(newData).then(response => {
                window.confirm('Data successfully changed')
                if(window.confirm) {
                    window.location = '/Profile'
                }
            })
        }
    }

    onChangeNumber(e) {
        this.setState({
            number: e.target.value
        })
    }
    onChangeUserLocation(e) {
        this.setState({
            location: e.target.value
        })
    }
    UserUpdate(e) {
        e.preventDefault()

        const newData = {
            email: JSON.parse(localStorage.getItem('prijavljeniKorisnik')).data.email,
            number: this.state.number,
            location: this.state.location
        }
        var flag = true
        if (!(newData.number.match(/^[0-9]+$/) != null)) {
            flag = false
            alert("Number can't contain letters")
        }
        else if(newData.location.length < 1) {
            flag = false
            alert('Input location')
        }
        if (flag) {
            usersServer.updateUser(newData).then(response => {
                window.confirm('Data successfully changed')
                if(window.confirm) {
                    window.location = '/Profile'
                }
            })
        }
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        })
    }
    onChangeType(e) {
        this.setState({
            type: e.target.value
        })
    }
    onChangeLocation(e) {
        this.setState({
            eventlocation: e.target.value
        })
    }
    onChangeDate(e) {
        this.setState({
            date: e.target.value
        })
    }
    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        })
    }
    
    onClickSave(e) {
        e.preventDefault()

        const newEvent = {
            name: this.state.name,
            type: this.state.type,
            location: this.state.eventlocation,
            date: this.state.date,
            description: this.state.description
        }
        var flag = true
        if(newEvent.name.length < 3) {
            flag = false
            alert('Event name length to short (minimum 3 characters)')
        }
        else if(newEvent.type == '') {
            flag = false
            alert('Choose event type')
        }
        else if(newEvent.location.length < 1) {
            flag = false
            alert('Input location')
        }

        const eventAdd = async(event) => {
            try {
                await eventsServer.addEvent(event).then(res => console.log(res.data))
                
                window.location = '/Profile'
            } catch {
                alert('Error')
            }
        }
        if (flag) {
            eventAdd(newEvent)
        }
    }

    render() {
        return(
            <div className="container">
                
                <div className="item-box">
                    <div className="box1">
                    <h2>User info</h2>
                    <form>
                        <div className="el-box">
                        <input type="text" readOnly 
                        value={this.state.username} onLoad={this.componentDidMount}/>
                        <label>Username</label>
                        </div>
                        <div className="el-box">
                        <input type="email" readOnly
                        value={this.state.email} onLoad={this.componentDidMount}/>
                        <label>E-mail</label>
                        </div>
                        <div className="el-box">
                        <input type="text" readOnly
                        value={this.state.number} onLoad={this.componentDidMount}/>
                        <label>Phone number</label>
                        </div>
                        <div className="el-box">
                        <input type="text" readOnly
                        value={this.state.location} onLoad={this.componentDidMount}/>
                        <label>Location</label>
                        </div>
                        <a className="btn" href="Profile#change-info">Change info</a>
                    </form>
                    </div>
                </div>
                <div className="item-box">
                    <div className="box2">
                    <form>
                        <h2>My events</h2>
                        <nav className="event-list">
                            <ul id='ul-event'>
                            </ul>
                        </nav>
                        <a className="btn" href="Profile#create-event">Create event</a>
                    </form>
                    </div>
                </div>

                <div className="overlay" id="change-info">
                <div className="wrapper">
                    <div className="content">
                        <div className="contain">
                            <form>
                                <h2>Personal info</h2>
                                <div className="el-box">
                                <input type="text" required
                                value={this.state.number} onChange={this.onChangeNumber}/>
                                <label>Phone number</label>
                                </div>
                                <div className="el-box">
                                <input type="text" required
                                value={this.state.location} onChange={this.onChangeUserLocation}/>
                                <label>Location</label>
                                </div>
                                <a className="btn" href="Profile" onClick={this.UserUpdate}>Save</a>
                                <a className="btn" href="Profile">Cancel</a>
                            </form>
                        </div>
                    </div>
                </div>
                </div>

                <div className="overlay" id="create-event">
                <div className="wrapper">
                    <div className="content">
                        <div className="contain">
                            <form>
                                <h2>Event info</h2>
                                <div className="el-box">
                                <input type="text" required
                                value={this.state.name} onChange={this.onChangeName}/>
                                <label>Name</label>
                                </div>
                                <div className="el-box">
                                <label>Type</label>
                                <select className="select-menu"
                                value={this.state.type} onChange={this.onChangeType}>
                                    <option>--</option>
                                    <option value={'Music'}>Music</option>
                                    <option value={'Film'}>Film</option>
                                    <option value={'Theater'}>Theater</option>
                                    <option value={'Sport'}>Sport</option>
                                    <option value={'Education'}>Education</option>
                                    <option value={'Exhibition'}>Exhibition</option>
                                    <option value={'Other'}>Other</option>
                                </select>
                                </div>
                                <div className="el-box">
                                <input type="text" required
                                value={this.state.eventlocation} onChange={this.onChangeLocation}/>
                                <label>Location</label>
                                </div>
                                <div className="el-box">
                                <input type="date" min={new Date().toISOString().split("T")[0]} required
                                value={this.state.date} onChange={this.onChangeDate}/>
                                <label>Date</label>
                                </div>
                                <div className="el-box">
                                <label>Description</label>
                                <textarea required value={this.state.description} onChange={this.onChangeDescription}></textarea>
                                </div>
                                <a className="btn" onClick={this.onClickSave}>Save</a>
                                <a className="btn" href="Profile">Cancel</a>
                            </form>
                        </div>
                    </div>
                </div>
                </div>

                <div className="overlay" id="edit-event">
                <div className="wrapper">
                    <div className="content">
                        <div className="contain">
                            <form>
                                <h2>Event info</h2>
                                <div className="el-box">
                                <input type="text" required
                                value={this.state.name} onChange={this.onChangeName}/>
                                <label>Name</label>
                                </div>
                                <div className="el-box">
                                <label>Type</label>
                                <select className="select-menu"
                                value={this.state.type} onChange={this.onChangeType}>
                                    <option>--</option>
                                    <option value={'Music'}>Music</option>
                                    <option value={'Film'}>Film</option>
                                    <option value={'Theater'}>Theater</option>
                                    <option value={'Sport'}>Sport</option>
                                    <option value={'Education'}>Education</option>
                                    <option value={'Exhibition'}>Exhibition</option>
                                    <option value={'Other'}>Other</option>
                                </select>
                                </div>
                                <div className="el-box">
                                <input type="text" required
                                value={this.state.eventlocation} onChange={this.onChangeLocation}/>
                                <label>Location</label>
                                </div>
                                <div className="el-box">
                                <input type="date" min={new Date().toISOString().split("T")[0]} required
                                value={this.state.date} onChange={this.onChangeDate}/>
                                <label>Date</label>
                                </div>
                                <div className="el-box">
                                <label>Description</label>
                                <textarea required value={this.state.description} onChange={this.onChangeDescription}></textarea>
                                </div>
                                <a className="btn" onClick={this.updateEvent}>Save</a>
                                <a className="btn" href="Profile">Cancel</a>
                                <a className="del-btn" onClick={this.eventDelete}>Delete</a>
                            </form>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

export default Profile