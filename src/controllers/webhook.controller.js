const mongoose = require('mongoose')
const Order = require('../models/order.model')
const Product = require('../models/product.model')

module.exports.razorpaywebhook = async (req, res, next) => {
    if (req.body.event !== "payment.captured") {
        return res.json({ ok: true })
    }
    const payment = req.body.payload.payment.entity

    const session = await mongoose.startSession()
    session.startTransaction()

    try {
        const order = await Order.findOne({
            "paymentInfo.orderId": payment.order_id
        }).session(session)

        if (!order || order.isPaid) {
            await session.abortTransaction();
            return res.json({ ok:true })
        }
        for(let item of order.items){
            await Product.updateOne(
                {
                    _id: item.product,
                    "variants.sku":item.sku,
                    "variants.stock":{$gte: item.quantity}
                },
                {
                    $inc:{"variants.$.stock": -item.quantity}
                },
                { session }
            )
        }

        order.isPaid = true,
        await order.save({ session })

        await session.commitTransaction()
        session.endSession()

        res.json({ success: true})
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.status(500).send("fail");
    }
}