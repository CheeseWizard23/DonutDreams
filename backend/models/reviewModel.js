const mongoose = require('mongoose')

const reviewSchema = mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        orderId: {
            type: String,
            required: true
        },
        userName: {
            type: String,
            required: true
        },
        reviewDonuts: [{ 
            name: {
                type: String,
                required: true,
            },
            qty: {
                type: Number,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            }
        }],
        starRating: {
            type: Number,
            required: true
        },
        comment: {
            type: String,
            required: true
        },
        reviewDate: {
            type: Date,
            default: Date.now
        }
    }
)

module.exports = mongoose.model('Review', reviewSchema)