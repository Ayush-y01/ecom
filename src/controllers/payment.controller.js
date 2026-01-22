const razorpay = require('../config/razorpay')
const Order = require('../models/order.model')
const crypto = require('crypto')

module.exports.createPayment = async (req, res) => {
    try {
        const { orderId } = req.body;

        const order = await Order.findById(orderId);

        if(!order) return res.status(404).json({ message: "Order not found" })
        
        const options = {
            amount: order.totalAmount * 100,
            currency: "INR",
            receipt: order._id.toString()
        };

        const razorpay = await razorpay.orders.create(options)

        order.paymentInfo = { orderId: razorpayOrder.id }
        await order.save()
        
        res.json({
            key: process.env.RAZORPAY_KEY_ID,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency,
            razorpayOrderId: razorpayOrder.id
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({ message:error.message })
    }
}

module.exports.verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
        .createHmac("sha256",process.env.RAZORPAY_KEY_SECRET)
        .update(body)
        .digest("hex");

        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({
                message: "Payment verification failed"
            })
        }
        const order = await Order.findOne({
            "paymentInfo.orderId": razorpay_order_id
        })

        order.isPaid = true;
        order.paidAt = new Date();
        order.paymentInfo.paymentId = razorpay_payment_id
        order.paymentInfo.signature = razorpay_signature

        await order.save()

        res.json({
            success:true,
            message:"Payment verified"
        })

    } catch (error) {
        res.status(500).json({ message: err.message });
    }
}