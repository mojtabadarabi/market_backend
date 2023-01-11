import mongoose from "mongoose"

const {Schema} = require('mongoose')

const Product = new Schema({
    name: {
        type: {
            _id: false,
            en: String,
            fa: String
        },
        required: true
    },
    images:{
        type:[{type:Object}],
        required:false,
        default:[]
    } ,
    description: {
        type: {
            _id: false,
            en: String,
            fa: String
        },
        required: true
    },
    tags: [{type: Schema.ObjectId, ref: 'Tags'}],
    created_date: {
        type: Date,
        default: Date.now
    },
    updated_date: {
        type: Date,
        default: Date.now
    },
    count: {
        type: String,
        default: 0
    },
    price: {
        type: String,
        default: null
    }
})


module.exports = mongoose.model('Product', Product)