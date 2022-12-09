import expressAsyncHandler from "express-async-handler";
import Product from '../models/productModel.js'

// @desc get products
// @route Put api/products
// @acess Privet
const getProducts =  expressAsyncHandler(async (req, res) => {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    }:{}
    const count = await Product.countDocuments({...keyword})
    const products = await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page-1))
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.status(200).json({products, page, pages: Math.ceil(count / pageSize)})
})

// @desc get product by id
// @route Put api/products/:id
// @acess Privet
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

// @desc delete a product
// @route Delete api/products/:id
// @acess Privet/Admin
const deleteProduct = expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        await product.remove()
        res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.json({message: 'Product removed'})
    } else {
        res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.status(404)
        throw new Error('Product not found')
    }
})

// @desc update a product
// @route update api/products/
// @acess Privet/Admin
const updateProduct = expressAsyncHandler(async (req, res) => {
    const {
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description
    } = req.body
    const product = await Product.findById(req.params.id)
    if(product){
        product.name = name
        product.price = price
        product.image = image
        product.brand = brand
        product.category = category
        product.countInStock = countInStock
        product.numReviews
        product.description = description
        const updatedProduct = await product.save()
        res.status(201).json(updatedProduct)
    }else{
        res.status(404)
        throw new Error('Product not found')
    }
})

// @desc Create new review
// @route update api/products/:id/reviews
// @acess Privet/Admin
const createPorductReview = expressAsyncHandler(async (req, res) => {
    const {
        rating,
        comment,
    } = req.body
    const product = await Product.findById(req.params.id)
    if(product){
        const alreadyReviewed = product.reviews.find(r=>r.user.toString()===req.user.id.toString())
        if(alreadyReviewed){
            res.status(400)
            throw new Error('Product reviewed already exist')
        }
        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }
        product.reviews.push(review)
        product.numReviews = product.reviews.length 
        product.rating = product.reviews.reduce((acc,item)=> item.rating + acc, 0)/ product.reviews.length 
        await product.save()
        res.status(201).json({message: 'Review added'})
    }else{
        res.status(404)
        throw new Error('Product not found')
    }
})

// @desc Top rated product
// @route update api/products/topRated
// @acess public
const getTopProducts = expressAsyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({rating: -1}).limit(3)
    res.json(products)
})

// @desc create a product
// @route create api/products/
// @acess Privet/Admin
const createProduct = expressAsyncHandler(async (req, res) => {
    const product = new Product({
        name: 'sample name',
        price:0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description',
    })
    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
    
})

export {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct,
    createPorductReview,
    getTopProducts
}
