const asyncHandler = require('express-async-handler')
const Review = require('../models/reviewModel')
const Order = require('../models/orderModel')

const getAllReviews = asyncHandler(async (req, res) => {
    try {
        const reviews = await Review.find()
        res.status(200).json(reviews)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
})

const getUserReviews = asyncHandler(async (req, res) => {
    const userId = req.params.id

    try {
        const userReviews = await Review.find({ userId })
        res.status(200).json(userReviews)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
})

const uploadReview = asyncHandler(async (req, res)=> {
    const { reviewDonuts, starRating, comment, orderId, userName } = req.body
    const userId = req.params.userId

    if (!reviewDonuts || !starRating || !comment || !orderId || !userName) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    const reviewExists = await Review.findOne({ userId: userId, orderId: orderId })
    const reviewOrder = await Order.findOne({ _id: orderId })

    if (reviewExists) {
        res.status(400)
        throw new Error('Review already exists')
    }

    if (!reviewOrder) {
        res.status(400)
        throw new Error('Order not found')
    }

    try {
        const review = await Review.create({
            userId,
            orderId,
            userName,
            reviewDonuts,
            starRating,
            comment
        })

        await reviewOrder.updateOne({ reviewCreated: true })

        if (review) {
            res.status(201).json(review)
        } else {
            res.status(400)
            throw new Error('Invalid review data')
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
    
})

const deleteReview = asyncHandler(async (req, res) => {
    const reviewId = req.params.reviewId
    const userId = req.params.userId
    const orderId = req.params.orderId
    const review = await Review.findById(reviewId)
    const order = await Order.findOne({ _id: orderId })

    if (!review) {
        res.status(400)
        throw new Error('Review not found')
    }

    if (!userId) {
        res.status(401)
        throw new Error('User not found')
    }

    if (review.userId !== userId) {
        res.status(400)
        throw new Error('User not authorized')
    }

    if (!order) {
        res.status(400)
        throw new Error('Order not found')
    }

    try {
        await review.remove()
        res.status(200).json(reviewId)

        await order.updateOne({ reviewCreated: false })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
})

module.exports = {
    getAllReviews,
    getUserReviews,
    uploadReview,
    deleteReview
}
