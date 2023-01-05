import {NextFunction, Request, response, Response} from "express";
import {checkToken, checkTokenExp, sendResponse} from "../helpers/helpers";
const jwt = require('jsonwebtoken');

class AuthMiddleware{
    validateRefreshToken(req:Request,res:Response,next:NextFunction){
        const token = req.headers['authorization']||undefined
        if(!token) return sendResponse(res, {data:null,msg:'authorization token not exist'},401,'authentication failed')
        const {payload,isPass} = checkToken(token)
        if(!isPass) return sendResponse(res, {data:null,msg:payload},401,'authentication failed')
        next()
    }
}

module.exports = new AuthMiddleware