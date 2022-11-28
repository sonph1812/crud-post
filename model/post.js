const mongoose = require('mongoose')


const PostSchema = new mongoose.Schema({

    content: {
        type: String,
        trim: true,
        maxlength: 25,
        unique: true
    },
    likes: [{ type: mongoose.Types.ObjectId, ref: 'user' }],

}, {
    timestamps: true
})


module.exports = mongoose.model('post', PostSchema)