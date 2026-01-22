const express = require('express')
const router = express.Router()

const PaymentController = require('../controllers/payment.controller')
const authMiddleware = require('../Middlewares/authMiddleware')

router.post("/create", authMiddleware.authUser,PaymentController.createPayment)
router.post("/verify", authMiddleware.authUser, PaymentController.verifyPayment)


module.exports = router