import {func} from "joi";
import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator";
import {sendResponse} from "../helpers/helpers";

module.exports = function (req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    return sendResponse(res, null, 300, errors.array().map((error: any) => error.msg))

}