import {ErrorRequestHandler, NextFunction, Request, Response} from "express";
import {sendResponse} from "./helpers";

export const ErrorHandler = (err: { statusCode: number, message: string, stack: any }, req: Request, res: Response, next: NextFunction) => {
    console.log("Middleware Error Hadnling");
    const errStatus = err.statusCode || 500;
    const errMsg = err.message || 'Something went wrong';
    // res.status(errStatus).json({
    //     data: null,
    //     status: errStatus,
    //     message: errMsg,
    //     // stack: process.env.NODE_ENV === 'development' ? err.stack : {}
    // })
    sendResponse(res,null,errStatus,errMsg)
}
