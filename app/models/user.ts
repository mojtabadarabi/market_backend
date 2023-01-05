import mongoose from "mongoose"
import {generateUsername} from "unique-username-generator";
import * as process from "process";
import {generateToken} from "../http/helpers/helpers";

const {Schema} = require('mongoose')
const jwt = require('jsonwebtoken');

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
        type:String,
        required:false,
        default:'user'
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