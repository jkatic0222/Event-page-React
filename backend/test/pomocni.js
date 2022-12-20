const Event = require('../models/event.model')
const User = require('../models/user.model')

const startEvents = [
    {
        id: 1,
        name: 'event1',
        type: 'Music',
        location: 'location1',
        date: '2022-08-22T00:00:00.000+00:00',
        description: 'description'
    },
    {
        id: 2,
        name: 'event2',
        type: 'Dance',
        location: 'location2',
        date: '2022-08-22T00:00:00.000+00:00',
        description: 'description'
    },
    {
        id: 3,
        name: 'event3',
        type: 'Music',
        location: 'location3',
        date: '2022-08-22T00:00:00.000+00:00',
        description: 'description'
    }
]

const usersInDatabase = async () => {
    const users = await User.find({})
    return users.map(k => k.toJSON())
}

const eventsInDatabase = async () => {
    const event = await Event.find({})
    return event.map(p => p.toJSON())
}

module.exports = {
    startEvents,
    usersInDatabase,
    eventsInDatabase
}