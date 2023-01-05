import { Request, Response ,NextFunction} from 'express';

export interface ReqType{
    req:Request,
    res:Response,
    next:NextFunction,
    error:any
}