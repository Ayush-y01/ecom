const Order = require('../models/order.model')
const User = require('../models/user.model')
const Product = require('../models/product.model')

module.exports.dashboardStats = async (req, res) => {
    try {
        const totalOrders = await Order.countDocuments()
        const totalUser = await User.countDocuments()

        const totalSalesData = await Order.aggregate([
            {$match: {isPaid: true} },
            {$group: {_id: null, total: {$sum: "$totalAmount"} } }
        ]) 

        const totalSales = totalSalesData[0]?.total || 0

        const today = new Date();
        today.setHours(0,0,0,0)

        const todaySalesData = await Order.aggregate([
            { $match: { isPaid:true, createdAt:{$gte: today } } },
            { $group: { _id: null, total:{$sum: "$totalAmount" } } }
        ])

        const todaySales = todaySalesData[0]?.total || 0

        res.json({
            totalOrders,
            totalUser,
            totalSales,
            todaySales
        })
        
    } catch (error) {
        res.status(500).json({ message: err.message })
    }
}

module.exports.allOrders = async (req, res) => {
    try {
        const status = req.query.status

        const filter = {}
        if (status) {
            filter.status = status
        }

        const orders = await Order.find(filter)
        .populate("user", "name email")
        .sort({ createdAt: -1 })

        res.json(orders)

    } catch (error) {
        res.status(500).json({ message: err.message })
    }
}

module.exports.updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body

        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new:true }
        )

        res.json(order)
    } catch (error) {
        res.status(500).json({ message: err.message })
    }
}

module.exports.cancelOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)

        if(!order) return res.status(404).json({ message: "Order not Found" })

        if (order.status === "CANCELLED") {
            return res.status(400).json({ message: "Already Cancelled"})
        }

        for(let item of order.item){
            await Product.updateOne(
                { id:item.Product , "variants.sku":item.sku },
                { $inc:{ "variants.$.stock": item.quantity}}
            )
        }

        order.status = "CANCELLED"
        await order.save()

        res.json({ message: "Order cancelled"})
    } catch (error) {
        res.status(500).json({message: err.message})
    }
}

module.exports.lowStockProducts = async(req, res) => {
    try {
        const products = await Product.find({
            "variants.stock":{$lt:5}
        })

        res.json(products)
    } catch (error) {
        res.status(500).json({message: err.message})
    }
}

module.exports.toggleProduct = async(req, res) => {
    try {
        const product = await Product.findById(req.params.id)

        product.isActive = !product.isActive

        await product.save()

        res.json(product)
    } catch (error) {
        res.status(500).json({ message:err.message})
    }
}