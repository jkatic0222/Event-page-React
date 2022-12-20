const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/user.model')

router.route('/').get((req,res) => {
    User.find({}).then(rezultat => {
        res.json(rezultat)
    })
})

// Register
router.route('/add').post(async(req,res) =>{
    const data = req.body
    const userMail = await User.findOne({email:data.email})
    const userName = await User.findOne({username:data.username})
    if(!userMail && !userName) {
        const runde = 10
        const passHash = await bcrypt.hash(data.password, runde)
        const newUser = new User({
            email: data.email,
            username: data.username,
            password: passHash,
            number: '',
            location: ''
        })

        const saved = await newUser.save()

        const userToken = {
            email: saved.email,
            id: saved.id
        }

        const token = jwt.sign(userToken, process.env.SECRET)
        res.status(200).send({
            token, email: data.email
        })
    }
    else {
        return res.status(401).json({
            error: 'error code 401'
        })
    }
})

router.route('/login').post(async(req,res) => {
    const data = req.body
    const user = await User.findOne({email: data.email})
    if(user) {
        const passFlag = await bcrypt.compare(data.password, user.password)

        if (passFlag) {
            const userToken = {
                email: user.email,
                id: user._id
            }

            const token = jwt.sign(userToken, process.env.SECRET)
            res.status(200).send({
                token, email: user.email
            })
        }
        else {
            return res.status(401).json({
                error: 'error code 401'
            })
        }
    }
    else {
        return res.status(401).json({
            error: 'error code 401'
        })
    }
})

router.route('/update').put(async(req,res) => {
    const data = req.body
    const user = await User.findOne({email: data.email})
    const id = user.id
    
    const update = {
        email: data.email,
        username: user.username,
        password: user.password,
        number: data.number,
        location: data.location
    }

    await User.findByIdAndUpdate(id, update, {new: true}).then(newUser => {
        res.json(newUser)
    })
})

module.exports = router