import expressAsyncHandler from "express-async-handler";
import Order from '../models/orderModel.js'

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

export {
    addOrderItems
}