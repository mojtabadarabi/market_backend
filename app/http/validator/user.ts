import {body, check, oneOf} from "express-validator";
import {hashPassword, renameObjectKEy, sendResponse} from "../helpers/helpers";

const User = require('../../models/user')
const validator = require("validator");

module.exports = {
    register: [
        check('username').exists().withMessage('please enter username ').bail()
            .custom(async (value, {req}) => {
                console.log(req.body)
                console.log('adfadfadf')
                // @ts-ignore
                if (validator.isEmail(value)) {
                    const foundedUser = await User.findOne({email: value})
                    if (foundedUser) throw new Error('username already exist !!!');
                    const hashedPass = hashPassword(req.body.password)
                    req.user = renameObjectKEy({...req.body,password:hashedPass}, 'username', 'email')
                    return true
                }
                if (validator.isMobilePhone(value, ['fa-IR'])) {
                    const foundedUser = await User.findOne({phone: value})
                    if (foundedUser) throw new Error('username already exist !!!');
                    const hashedPass = hashPassword(req.body.password)
                    req.user = renameObjectKEy({...req.body,password:hashedPass}, 'username', 'phone')
                    return true
                }
                throw new Error('enter phone or email');
            }),
        check('password').exists().withMessage('enter password').bail().isLength({min: 8}).withMessage('enter secure password')
    ],
    login:[
        check('username').exists().withMessage('please enter username ').bail()
            .custom(async (value, {req}) => {
                // @ts-ignore
                if (validator.isEmail(value)) {
                    req.user = renameObjectKEy({...req.body}, 'username', 'email')
                    return true
                }
                if (validator.isMobilePhone(value, ['fa-IR'])) {
                    req.user = renameObjectKEy({...req.body}, 'username', 'phone')
                    return true
                }
                throw new Error('enter phone or email');
            }),
        check('password').exists().withMessage('enter password')
    ],
    update:[
        check('id').notEmpty().withMessage('id is requires').bail().isMongoId().withMessage('id is not valid')
    ],
}