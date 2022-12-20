const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../index')
const api = supertest(app)
const pomocni = require('./pomocni')
const Event = require('../models/event.model')
const jwt = require('jsonwebtoken')

beforeEach(async () => {
    await Event.deleteMany({})
    let objectEvent = new Event(pomocni.startEvents[0])
    await objectEvent.save()
    objectEvent = new Event(pomocni.startEvents[1])
    await objectEvent.save()
    objectEvent = new Event(pomocni.startEvents[2])
    await objectEvent.save()
})

test('eventi se vraćaju kao JSON', async () => {
    await api
    .get('/events')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('baza sadrži 3 vježbe', async () => {
    const odgovor = await api.get('/events')
    expect(odgovor.body).toHaveLength(pomocni.startEvents.length)
})

test('provjera opisa eventa', async () => {
    const odgovor = await api.get('/events')
    const opis = odgovor.body.map(ev => ev.description)
    expect(opis).toContain('description')
})

test('dodavanje ispravnog eventa', async() => {
    
    const novi = {
        name: 'event',
        type: 'Music',
        location: 'location',
        date: '2022-08-22T00:00:00.000+00:00',
        description: 'opis'
    }
    const user = {
        email: 'admin@gmail.com',
        id: '6304085e04801b3396d980d5'
    }
    token = jwt.sign(user, process.env.SECRET)
    await api
    .post('/events/add')
    .set('Authorization', `Bearer ${token}`)
    .send(novi)
    .expect(200)
    .expect("Content-Type",/application\/json/)

    const odgovor = await pomocni.eventsInDatabase()
    const opis = odgovor.map(ev => ev.description)
    expect(opis).toContain('opis')
    expect(odgovor).toHaveLength(pomocni.startEvents.length + 1)
})

afterAll(() => {
    mongoose.connection.close()
})