import express from 'express'
import dotenv from 'dotenv'
import products from './data/products.js'
import connectDB from './config/db.js'

const app = express()

connectDB()
dotenv.config()

const PORT = process.env.PORT || 5000

app.get('/', (req, res) => {
    res.send('Api is running now')
})
app.get('/api/products', (req, res) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.status(200).send(products)
})
app.get('/api/products/:id', (req, res) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    const product = products.find(p => p._id === req.params.id)
    res.json(product)
})


app.get('/cors', (req, res) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.send({ "msg": "This has CORS enabled 🎈" })
})


app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on localhost:${PORT}`))