const express = require('express')
const { getAllReviews, getUserReviews, uploadReview, deleteReview } = require('../controllers/reviewController')
const { protect } = require('../middleware/authMiddleware')
const router = express.Router()

router.get('/', getAllReviews)
router.get('/:id', getUserReviews)
router.post('/:userId', uploadReview)
router.delete('/:userId/:reviewId/:orderId', deleteReview)


module.exports = router