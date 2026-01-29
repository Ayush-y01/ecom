const Order = require('../models/order.model')

module.exports.requestReturn = async(req, res) => {
    try {
        const order = await Order.findById(req.params.id)

        if(!order) return res.status(404).json({ message: "Order not found"})

        if(order.user.toString() !== req.userId)
            return res.status(403).json({ message: "Not allowed" })

        if(order.returnStatus !== "NONE")
            return res.status(400).json({ message: "return already processed !"})
        
        order.returnStatus = "REQUESTED"
        await order.save()

        res.json({ message: "Return requested"})
    } catch (error) {
        res.status(500).json({ message:err.message})
    }
}