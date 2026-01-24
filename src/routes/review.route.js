const express = require('express')
const router = express.Router()

const reviewController = require('../controllers/review.controller')
const authMiddleware = require('../Middlewares/authMiddleware')

router.post("/", authMiddleware.authUser, reviewController.addReview)


module.exports = router