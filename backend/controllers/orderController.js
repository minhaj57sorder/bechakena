import expressAsyncHandler from "express-async-handler";
import Order from '../models/orderModel.js'
// @desc    add order items
// @route   post /api/orders/
// @access  Privet
const addOrderItems =  expressAsyncHandler(async (req, res) => {
    const {orderItems,
        shippingAddress, 
        paymentMethod, 
        itemsPrice, 
        tasPrice, 
        shippingPrice, 
        totalPrice}= req.body

    if(orderItems && orderItems.length ===0){
        res.status(4000)
        throw new Error('No order items')
        return
    }else{
        const order = new Order({
            orderItems,
            user: req.user._id,
            shippingAddress, 
            paymentMethod, 
            itemsPrice, 
            tasPrice, 
            shippingPrice, 
            totalPrice
        })
        const createdOrder = await order.save()
        res.status(201).json(createdOrder)
    }
})

// @desc    Get order by id
// @route   GET /api/orders/:id
// @access  Privet
const getOrderById =  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')

    if(order){
        res.json(order)
    }else{
        res.status(404)
        throw new Error('Order not found')
    }
})

// @desc    Update order
// @route   GET /api/orders/:id/pay
// @access  Privet
const updateOrderToPaid =  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
    if(order){
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_addres: req.body.payer.email_address
        }
        const updatedOrder = await order.save()
        res.json(updatedOrder)
    }else{
        res.status(404)
        throw new Error('Order not found')
    }
})

// @desc    Mark order to delivered
// @route   GET /api/orders/:id/deliver
// @access  Privet
const updateOrderToDelivered =  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
    if(order){
        order.isDelivered = true
        order.deliveredAt = Date.now()
        const updatedOrder = await order.save()
        res.json(updatedOrder)
    }else{
        res.status(404)
        throw new Error('Order not found')
    }
})

// @desc    Get my order
// @route   GET /api/orders/myorders
// @access  Privet
const getMyOrders =  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({user: req.user._id})
    res.send(orders)
    
})

// @desc    Get All order
// @route   GET /api/orders
// @access  Privet
const getOrders =  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name')
    res.send(orders)
})

export {
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getMyOrders,
    getOrders
}