import mongoose from "mongoose";

const {Schema} =  require('mongoose')

const Permissions = new Schema({
    value:String,
    descriptions:String
})

module.exports = mongoose.model('Permissions',Permissions)