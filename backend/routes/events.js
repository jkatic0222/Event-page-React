const router = require('express').Router()
const jwt = require('jsonwebtoken')

const Event = require('../models/event.model')
const User = require('../models/user.model')

const getToken = req => {
    const auth = req.get('authorization')
    if (auth && auth.toLowerCase().startsWith('bearer')) {
        return auth.substring(7)
    }
    return null
}

router.route('/').get((req,res) => {
    Event.find({}).then(rezultat => {
        res.json(rezultat)
    })
})

router.route('/add').post(async(req,res) => {
    const data = req.body
    const token = getToken(req)
    const dekToken = jwt.verify(token, process.env.SECRET)
    if (!token || !dekToken.id) {
        return res.status(401).json({error: 'wrong or nonexistent token'})
    }
    const user = await User.findById(dekToken.id)
    
    const newEvent = new Event({
        name: data.name,
        type: data.type,
        location: data.location,
        date: Date.parse(data.date),
        description: data.description,
        user: user._id
    })

    const saveEvent = await newEvent.save()
    user.events = user.events.concat(saveEvent)
    await user.save()

    res.json(saveEvent)
})

router.route('/update/:id').put(async(req,res) => {
    const data = req.body
    const id = req.params.id

    const update = {
        name: data.name,
        type: data.type,
        location: data.location,
        date: data.date,
        description: data.description
    }

    await Event.findByIdAndUpdate(id, update, {new: true}).then(newEvent => {
        res.json(newEvent)
    })
})

router.route('/delete/:id').delete(async(req,res) => {
    const id = req.params.id
    const token = getToken(req)
    const dekToken = jwt.verify(token, process.env.SECRET)
    const user = await User.findById(dekToken.id)

    if(!token || !dekToken || !(user.events.includes(id))){
        return res.status(401).send('401')
    }

    await Event.findByIdAndRemove(req.params.id)

    res.status(204).end()
})

module.exports = router