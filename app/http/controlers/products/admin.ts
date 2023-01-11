import {NextFunction, Request, Response} from 'express';

const {addExistedProps, sendResponse} = require('../../helpers/helpers')

const DatabaseTools = require('../../../http/helpers/Mongo')
const Product = require('../../../models/product/product')

module.exports = new class adminControler {
    async create(req: any, res: Response) {
        const product = await Product.create({
            ...req.body,
            images: req?.files|| null
        })
        await product.save()
        sendResponse(res, product, 200, 'successfully')
    }
    async update(req: Request, res: Response) {
        console.log(req.body)
        const product = await Product.findByIdAndUpdate(req.body.id,req.body,{returnOriginal:false})
        sendResponse(res, product, 200, 'successfully')
    }
    async delete(req: Request, res: Response) {
        const removedProduct = await Product.findByIdAndRemove(req.body.id)
        if(!removedProduct) return sendResponse(res, null, 401, 'id is invalid')
        sendResponse(res, null, 200, 'successfully')
    }
}
