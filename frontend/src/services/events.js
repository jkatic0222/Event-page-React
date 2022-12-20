import axios from 'axios'

let token = null
const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = () => {
    return axios.get('http://localhost:5000/events/').then(response => response.data)
}

const addEvent = async event => {
    const config = {
        headers: {Authorization: `bearer ${JSON.parse(localStorage.getItem('prijavljeniKorisnik')).data.token}`}
    }
    const odg = await axios.post('http://localhost:5000/events/add', event, config)
    return odg
}

const deleteEvent = async id => {
    const config = {
        headers: {Authorization: `bearer ${JSON.parse(localStorage.getItem('prijavljeniKorisnik')).data.token}`}
    }
    return await axios.delete('http://localhost:5000/events/delete/' + id, config)
}

const updateEvent = async (event) => {
    return await axios.put('http://localhost:5000/events/update/' + event.id, event)
}

export default {
    setToken,
    getAll,
    addEvent,
    deleteEvent,
    updateEvent
}