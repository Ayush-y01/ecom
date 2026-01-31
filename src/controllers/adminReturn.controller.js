const Order = require('../models/order.model')

module.exports.approveReturn = async(req, res) => {
    try {
        const order = await Order.findById(req.params.id)

        if (!order) {
            return res.status(404).json({message:"order not found"})
        }

        if (order.returnStatus !== "REQUESTED") {
            return res.status(400).json({ message: "No return request found"})
        }

        order.returnStatus = "APPROVED"
        await order.save()

        res.json({ message: "Return Approved"})
    } catch (error) {
        res.status(500).json({message:err.message})
    }
}