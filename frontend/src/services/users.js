import axios from 'axios'

const getAll = () => {
    return axios.get('http://localhost:5000/users/').then(response => response.data)
}

const loginUser = async log => {
    return axios.post('http://localhost:5000/users/login', log)
}

const addUser = async user => {
    return axios.post('http://localhost:5000/users/add', user)
}

const updateUser = async (user) => {
    return await axios.put('http://localhost:5000/users/update', user)
}

export default {
    getAll,
    loginUser,
    addUser,
    updateUser
}