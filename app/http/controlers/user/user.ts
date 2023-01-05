import {NextFunction, Response} from 'express';
import {checkPassword, sendResponse} from "../../helpers/helpers";

const User = require('../../../models/user')
const _ = require('lodash')

module.exports = new class ClientControlers {
    async register(req: any, res: Response, next: NextFunction) {
        const user = await User.create({
            ...req.user,
            profile: req?.file?.path && `http://localhost:${process.env.PORT}/${req?.file?.path}` || null
        })
        await user.save()
        sendResponse(res, {user: _.omit({...user}._doc, ['password', '__v', 'role'])}, 200, 'successfull')
    }

    async login(req: any, res: Response, next: NextFunction) {
        const user = await User.findOne(_.pick(req.user, ['email', 'phone']))
        if (!user) return sendResponse(res, null, 300, 'user is not exist')
        if (!checkPassword(req.user.password, user.password)) return sendResponse(res, null, 300, 'username or password is not correct')
        const token = user.generateAuthToken()
        sendResponse(res, {
            user: _.omit({...user}._doc, ['__v', 'password']),
            token
        }, 200, 'successfull')
    }

    async update(req: any, res: Response, next: NextFunction) {
        const user = await User.findByIdAndUpdate(req.body.id, {
            ...req.user,
            profile: req?.file?.path && `http://localhost:${process.env.PORT}/${req?.file?.path}` || null
        }, {returnOriginal: false})
        sendResponse(res, {
            user: _.omit({...user}._doc, ['__v', 'password']),
        }, 200, 'successfull')
    }
}
