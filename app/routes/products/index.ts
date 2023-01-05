import {body, check} from "express-validator";
import {required} from "joi";
import {uploadMulter} from "../../http/helpers/upload";

const validationMiddleware = require('../../http/middlewares/validationMiddleware')
const productsValidator = require('../../http/validator/products')

const express = require('express')
const productRouter = express.Router()
const client = require('../../http/controlers/products/client')
const admin = require('../../http/controlers/products/admin')
const AuthMiddleware = require('../../http/middlewares/authMiddleware')
const multer = require('multer');

productRouter.post('/products', client.getAll)
productRouter.post(
    '/product',
    [productsValidator.getSingle],
    validationMiddleware,
    client.getSingle)

productRouter.post(
    '/create',
    AuthMiddleware.validateRefreshToken,
    [productsValidator.create],
    uploadMulter.single('images'),
    validationMiddleware,
    admin.create)


productRouter.post(
    '/update',
    AuthMiddleware.validateRefreshToken,
    [productsValidator.update],
    validationMiddleware,
    admin.update)

productRouter.post(
    '/delete',
    AuthMiddleware.validateRefreshToken,
    [productsValidator.delete],
    validationMiddleware,
    admin.delete)

module.exports = productRouter