const asyncHandler = require('express-async-handler')
const Order = require('../models/orderModel')

const getOrders = asyncHandler(async (req, res) => {
    const userId = req.params.id

    const orders = await Order.find({ userId }).sort({ date: -1 })

    res.status(200).json(orders)    
})

const checkout = asyncHandler(async (req, res) => {
    const userId = req.params.id
    const { donuts, totalQuantity, totalPrice, shippingAddress } = req.body
    try {
        const order = await Order.create({
            userId,
            donuts,
            totalQuantity,
            totalPrice,
            shippingAddress,
        })

        res.status(201).json(order)
    } catch (error) {
        res.status(500).json(error)
    }

})

module.exports = {
    getOrders,
    checkout
}