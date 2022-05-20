const express = require('express')
const { getOrders, checkout } = require('../controllers/orderController')
const { protect } = require('../middleware/authMiddleware')
const router = express.Router()

router.get('/:id', getOrders)
router.post('/checkout/:id', checkout)

module.exports = router