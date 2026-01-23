const express = require('express')
const router = express.Router()

const couponController = require('../controllers/coupon.controller')
const authMiddleware = require('../Middlewares/authMiddleware')
const admin = require('../Middlewares/admin')

router.post('/apply', authMiddleware.authUser, couponController.applyCoupon)

router.post('/', authMiddleware.authUser, admin, async (req, res)=>{
    const Coupon = require('../models/coupon.model')
    const coupon = await Coupon.create(req.body);
    res.status(201).json(coupon)
})

module.exports = router