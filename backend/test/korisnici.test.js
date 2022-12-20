const bcrypt = require('bcrypt')
const User = require('../models/user.model')
const pomocni = require('./pomocni')

const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../index')
const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})

    const passHash = await bcrypt.hash('tajna', 10)
    const user = new User({username: 'admin', email: 'admin@gmail.com', password: passHash})

    await user.save()
})

test('stvaranje novog korisnika', async () => {
    const startUsers = await pomocni.usersInDatabase()

    const novi = {
        username: 'username',
        email: 'mail@pmfst.hr',
        password: 'lozinka'
    }

    await api
    .post('/users/add')
    .send(novi)
    .expect(200)
    .expect('Content-Type', /application\/json/)

    const endUsers = await pomocni.usersInDatabase()
    expect(endUsers).toHaveLength(startUsers.length + 1)

    const userEmail = endUsers.map(u => u.email)
    expect(userEmail).toContain(novi.email)
})
test('vraćanje pogreške u slučaju postojanja email-a', async () => {
    const startUsers = await pomocni.usersInDatabase()

    const novi = {
        username: 'admin',
        email: 'admin@gmail.com',
        password: 'tajna'
    }

    const rezultat = await api
    .post('/users/add')
    .send(novi)
    .expect(401)
    .expect('Content-Type', /application\/json/)

    expect(rezultat.body.error).toContain('error code 401')

    const endUsers = await pomocni.usersInDatabase()
    expect(endUsers).toHaveLength(startUsers.length)
})

test('ažuriranje podataka korisnika', async () => {
    const novi = {
        username: 'update',
        email: 'update@gmail.com',
        password: 'lozinka'
    }

    await api
    .post('/users/add')
    .send(novi)

    const data = {
        email: 'update@gmail.com',
        number: '0123456',
        location: 'location'
    }

    await api
    .put('/users/update')
    .send(data)
    .expect(200)
    .expect('Content-Type', /application\/json/)

    const endUsers = await pomocni.usersInDatabase()

    const userNumber = endUsers.map(u => u.number)
    expect(userNumber).toContain(data.number)
})

afterAll(async () => {
    await mongoose.connection.close()
})