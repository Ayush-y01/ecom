const razorpay = require('../config/razorpay')
const Order = require('../models/order.model')
const Product = require('../models/product.model')

module.exports.processRefund = async(req, res) =>{
    try {
        const order = await Order.findById(req.params.id)

        if (!order) {
            return res.status(404).json({ message:"Order Not Found"})
        }

        if (order.returnStatus !== "APPROVED") {
            return res.status(400).json({ message:"Return Not Approved "})
        }
        const refund = await razorpay.payments.refund(
            order.paymentInfo.paymentId
        )

        for (let item of order.items) {
            await Product.updateOne(
                {_id: item.product, "variants.aku":item.sku},
                {$inc: {"variants.$.stock":item.quantity} }
            )
        }
        order.returnStatus = "REFUNDED"
        order.refundInfo = {
            refundId : refund.id,
            refundedAt: new Date()
        }

        await order.save()

        res.json({ message: "Refund Processed"})
    } catch (error) {
        res.status(500).json({ message: err.message })
    }
}