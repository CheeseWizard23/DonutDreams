const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    donuts: [{ 
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
    totalQuantity: { 
        type: Number,
        required: true,
        default: 0
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0
    },
    shippingAddress: {
        type: String,
        required: true,
    },
    reviewCreated: {
        type: Boolean,
        default: false,
    },
    date_added: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Order', orderSchema);