import React from "react"
import eventsServer from '../../services/events'
import '../css/Events.css'

class Event extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        eventsServer.getAll().then(res => {
            var list = document.getElementById('ul-event')
            res.forEach(el => {
                var idSpam = document.createElement('spam')
                idSpam.id = 'event-name'
                idSpam.innerText = el.name
                var locSpam = document.createElement('spam')
                var date = el.date.toString()
                var day = date.substring(8,10)
                var month = date.substring(5,7)
                var year = date.substring(0,4)
                var loc = el.location
                locSpam.innerText = '['+day+'.'+month+'.'+year+' '+loc+']'

                var div1 = document.createElement('div')
                div1.appendChild(idSpam)
                div1.appendChild(locSpam)

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
            });           
        })
    }

    render() {
        return(
            <div>
                <div className="container">
                <div className="event-box">
                    <form>
                        <h2>Events</h2>
                        <nav className="events">
                            <ul id='ul-event'>
                            </ul>
                        </nav>
                    </form>
                </div>
                </div>
            </div>
        )
    }
}

export default Event