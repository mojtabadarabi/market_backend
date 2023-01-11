import {NextFunction, Request, response, Response} from "express";
import {checkToken, checkTokenExp, sendResponse} from "../helpers/helpers";
const {ROLES} = require("../../../constants");
const jwt = require('jsonwebtoken');
const AuthHelper = require('../helpers/auth')

class AuthMiddleware{

    decodedToken:any

    constructor() {
        // this.decodedToken=null
    }

    validateRefreshToken(req:Request,res:Response,next:NextFunction){
        const token = req.headers['authorization']||undefined
        const validatedTokenResult = AuthHelper.validateRefreshToken(token)
        if(validatedTokenResult.isError){
            return sendResponse(res, validatedTokenResult.data,validatedTokenResult.status,validatedTokenResult.msg)
        }
        // const token = req.headers['authorization']||undefined
        // if(!token) return sendResponse(res, {data:null,msg:'authentication token not exist'},401,'authentication failed')
        // const {payload,isPass} = checkToken(token)
        // console.log(this)
        // console.log(this.decodedToken)
        // this.decodedToken=payload
        // if(!isPass) return sendResponse(res, {data:null,msg:payload},401,'authentication failed')
        next()
    }
    checkRole(req:Request,res:Response,next:NextFunction){
        const validatedUserRoleExist = AuthHelper.checkRole()
        if(validatedUserRoleExist.isError){
            return sendResponse(res, validatedUserRoleExist.data,validatedUserRoleExist.status,validatedUserRoleExist.msg)
        }
        next()
    }
    async checkAuthor(req:Request,res:Response,next:NextFunction){
        const validatedUserRole = await AuthHelper.checkPermission(ROLES.AUTHOR_ROLE)
        if(validatedUserRole.isError){
            return sendResponse(res, validatedUserRole.data,validatedUserRole.status,validatedUserRole.msg)
        }
        next()
    }
}

module.exports = new AuthMiddleware()