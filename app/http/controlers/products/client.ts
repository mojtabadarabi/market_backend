import {NextFunction, Request, Response} from 'express';

const {addExistedProps, sendResponse} = require('../../helpers/helpers')

const DatabaseTools = require('../../../http/helpers/Mongo')
const Product = require('../../../models/product/product')
const Tag = require('../../../models/product/tag')

module.exports = new class ClientControlers {
    async getAll(req: Request, res: Response, next: NextFunction) {
        const {page, paginate} = req.headers
        const optionedRequest = addExistedProps(req.body, ['name', 'description', 'tags', 'max_price', 'min_price', 'max_created_date', 'min_created_date'])
        const products = await DatabaseTools.getAllModelPagination(Product, page, paginate, optionedRequest)
        sendResponse(res, products, 200, 'successfully', {total: products.length})
    }

    async getSingle(req: Request, res: Response, next: NextFunction) {
        const product = await Product.findById(req.body.id).populate('tags')
        console.log({...product._doc,name:product._doc.name.fa})
        sendResponse(res, product, 200, 'successfully')
    }
}
