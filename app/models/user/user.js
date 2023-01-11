const mongoose = require("mongoose")
const {generateUsername} = require("unique-username-generator")
const {Schema} = require('mongoose')
const jwt = require('jsonwebtoken');
const Roles = require('./role')
const {generateToken} = require("../../http/helpers/helpers");

const User = new Schema({
    user_name:{
        type:String,
        required:false,
        default:generateUsername("-")
    },
    profile:{
        type:String,
        required:false,
        default:null
    },
    name:{
        type:String,
        required:false,
        default:null
    },
    phone:{
        type:String,
        required:false,
        default:null
    },
    email:{
        type:String,
        required:true,
        default:null
    },
    address:{
        type:String,
        required:false,
        default:null
    },
    role:{
        type:Schema.ObjectId,
        ref: 'Roles',
        required:false,
    },
    password:{
        type:String,
        required:true,
    },
    created_date:{
        type:Date,
        default:Date.now
    },
    updated_date:{
        type:Date,
        default:Date.now
    },
})

User.pre('save', async function(next) {
    if(!this.role){
        const role = await Roles.findOne({value:'user'})
        this.role=role['_id']
    }
    next()
})
User.methods.generateAuthToken = function () {
    const data = {
        _id: this._id,
        email: this.email,
        phone: this.phone,
        role: this.role,
    };
    let today = new Date();
    today.setHours(today.getHours() + 8);
    return {
        token:generateToken(data),
        exp:today
    };

};

module.exports=mongoose.model('User',User)