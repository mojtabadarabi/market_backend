import mongoose from "mongoose";

const {Schema} =  require('mongoose')

const Roles = new Schema({
    value:String,
    permissions:{
        type:[{type: Schema.ObjectId, ref: 'Permissions'}],
        required:false,
        default:null
    }
})

module.exports = mongoose.model('Roles',Roles)