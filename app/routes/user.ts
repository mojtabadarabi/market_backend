import { uploadMulter} from "../http/helpers/upload";
const AuthMiddleware = require('../http/middlewares/authMiddleware')

const express = require('express')
const userRouter = express.Router()
const user = require('../http/controlers/user/user')
const validationMiddleware = require('../http/middlewares/validationMiddleware')
const usersValidator = require('../http/validator/user')
const multer = require('multer');

userRouter.post(
    '/sync_app',
    AuthMiddleware.validateRefreshToken,
    user.getUser
)
userRouter.post(
    '/register',
    uploadMulter.single('profile'),
    [usersValidator.register],
    validationMiddleware,
    user.register
)
userRouter.post(
    '/login',
    [usersValidator.login],
    validationMiddleware,
    user.login
)
userRouter.post(
    '/update'
    ,AuthMiddleware.validateRefreshToken,
    uploadMulter.single('profile'),
    [usersValidator.update],
    validationMiddleware,
    user.update
)

module.exports = userRouter