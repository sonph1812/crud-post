const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        trim: true,
        maxlength: 25
    },
    username: {
        type: String,
        trim: true,
        maxlength: 25,
        unique: true
    },
    email: {
        type: String,
        trim: true,
        unique: true
    },
    password: {
        type: String,
    },
}, {
    timestamps: true
})


module.exports = mongoose.model('user', userSchema)