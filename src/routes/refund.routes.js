const express = require('express')
const router = express.Router()

const refundController = require('../controllers/refund.controller')
const authMiddleware = require('../Middlewares/authMiddleware')

router.post('/:id/refund', authMiddleware.authUser, refundController.processRefund)

module.exports = router