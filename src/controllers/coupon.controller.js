const Coupon = require('../models/coupon.model')
const Order = require('../models/order.model')

module.exports.applyCoupon = async(req, res) => {
    try {
        const { orderId,code } = req.body

        const coupon = await Coupon.findOne({ code:code.toUpperCase(), isActive: true })

        if (!coupon) return res.status(404).json({ message: "Invalid Coupon!! "})

        if (coupon.expiry < new Date()) return res.status(400).json({ message:"Coupon Expired" })

        const order = await Order.findById(orderId)

        if(!order) return res.status(404).json({ message: "Order Not Found" })
         
        if (order.totalAmount < coupon.minOrderValue) {
            return res.status(400).json({ message: "Order Amount Is to Low for Coupon" })
        }

        let discount = 0

        if (coupon.discountType === "FLAT") {
            discount = coupon.discountValue
        }else {
            discount = ( order.totalAmount * coupon.discountValue ) / 100
        }

        order.totalAmount = Math.max(order.totalAmount - discount, 0);
        order.coupon = code

        await order.save();

        res.json({
            success:true,
            netAmount: order.totalAmount,
            discount
        })

    } catch (error) {
        res.status(500).json({ message: error.message})
    } 
}