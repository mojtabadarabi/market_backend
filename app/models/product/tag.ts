import mongoose from "mongoose"

const {Schema} = require('mongoose')

const Tags = new Schema({
    name: {
        type: {
            _id: false,
            en: String,
            fa: String
        },
        required: true
    },
    created_date: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('Tags', Tags)