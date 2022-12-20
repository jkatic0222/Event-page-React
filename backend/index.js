const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())
app.use(express.static('build'))
require('dotenv').config()

const PORT = 5000
app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
})

const mongoose = require('mongoose')

const password = process.env.PASS
const dbname = process.env.NODE_ENV === 'test'
? 'event-base-test'
: 'event-base'

const url = `mongodb+srv://jkatic:${password}@cluster0.badqp.mongodb.net/${dbname}?retryWrites=true&w=majority`

mongoose.connect(url)
const connection = mongoose.connection
connection.once('open', () => {
    console.log("Connected")
})

const usersRouter = require('./routes/users')
const eventsRouter = require('./routes/events')
app.use('/users', usersRouter)
app.use('/events', eventsRouter)

module.exports = app