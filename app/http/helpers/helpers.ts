// send requests
import {uniqueUsernameGenerator} from "unique-username-generator";

const {GENERATE_USER_NAME} = require("../../../config/MongoConfig");
const {SALT_ROUND} = require("../../../config/globalConfig");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

export const sendResponse = (res: any, data: any, status: any, message: any, options: any = null, stack: any = null) => {
    res.status(status).json({status, data, message, stack, ...options})
}

// add exist property in req.body to find methods of mongo
export const addExistedProps = (body: any, props: any) => {
    let addedBody: any = {}
    props.map((prop: any) => {
        // if that property exist in request
        if (body[prop]) {
            // use $in for arrays property
            if (Array.isArray(body[prop])) {
                addedBody[prop] = {$in: body[prop]}
            }
            // use $ gte & $lte for dates or numeric property
            else if (Number(body[prop]) || dateIsValid(body[prop])) {
                // find index of _ for check type of property
                // like max_price is max =>{$lte:price}
                const indexOfUnderline = prop.indexOf('_')
                const property = prop.substring(indexOfUnderline + 1)
                const propertyType = prop.substring(0, indexOfUnderline)
                if (propertyType === 'max') {
                    addedBody[property] = {$lte: body[prop]}
                }
                if (propertyType === 'min') {
                    addedBody[property] = {...addedBody[prop], $gte: body[prop]}
                }
            }
            // use for strings reg
            else {
                addedBody[prop] = new RegExp('.*' + body[prop] + '.*')
            }
        }
    })
    return addedBody;
}

export const dateIsValid = (date: any) => {
    // @ts-ignore
    if (Object.prototype.toString.call(new Date(date)) === "[object Date]") {
        // it is a date
        // @ts-ignore
        if (isNaN(new Date(date))) { // d.getTime() or d.valueOf() will also work
            // date object is not valid
            return false
        } else {
            return true
            // date object is valid
        }
    } else {
        return false
        // not a date object
    }
}

// generate random user name
export const randomUserName = () => {
    // @ts-ignore
    console.log(GENERATE_USER_NAME)
    console.log(uniqueUsernameGenerator(GENERATE_USER_NAME))
    return 'username';
}

// rename object key
export const renameObjectKEy = (object: any, key: string, newKey: string) => {
    object[newKey] = object[key];
    delete object[key];
    return object
}

// hash password
export const hashPassword = (password: string) => {
    const salt = bcrypt.genSaltSync(SALT_ROUND);
    return bcrypt.hashSync(password, salt);
}
// check password
export const checkPassword = (password: string, userPassword: string) => {
    console.log(password)
    return bcrypt.compareSync(password, userPassword)
}
// generate token
export const generateToken = (data: any) => {
    return jwt.sign(data, process.env.JWT_KEY, {
        expiresIn: '8h'
    })
}
// validate token
export const checkToken=(token:any)=>{
    try{
        return {
            payload:jwt.verify(token, process.env.JWT_KEY),
            isPass:true
        }
    }
    catch (e:any) {
        return {
            payload:e.message,
            isPass: false
        }
    }
}
// check exp token
export const checkTokenExp=(date:number)=>{
    if (Date.now() >= date * 1000) {
        return false;
    }
    return true
}