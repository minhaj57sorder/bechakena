import expressAsyncHandler from "express-async-handler";
import Product from '../models/productModel.js'

const getProducts =  expressAsyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.status(200).send(products)
})

const getProductById = expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.json(product)
    } else {
        res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.status(404)
        throw new Error('Product not found')
    }
})

export {
    getProducts,
    getProductById
}
