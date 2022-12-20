const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: false
    },
    location: {
        type: String,
        required: false
    },
    events: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Event'
        }
    ]
})
userSchema.plugin(uniqueValidator)

const User = mongoose.model('User', userSchema)

module.exports = User