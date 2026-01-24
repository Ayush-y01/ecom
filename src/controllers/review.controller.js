const Review = require('../models/review.model')
const Order = require('../models/order.model')

module.exports.addReview = async (req, res) => {
    try {
        const { productId, rating, comment } = req.body

        const bought = await Order.findOne({
            user: req.userId,
            "items.product": productId,
            isPaid:true
        })

        if (!bought) {
            return res.status(403).json({ message:"Buy Product to review"})
        }
        const review = await Review.create({
            user: req.userId,
            product: productId,
            rating,
            comment
        })

        res.status(201).json(review)

    } catch (error) {
        res.status(500).json({ message:error.message })
    }
}