const razorpay = require('../config/razorpay');
const Order = require('../models/order.model');

module.exports.createPayment = async (req, res) => {
  try {
    const { orderId } = req.body;

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    const options = {
      amount: order.totalAmount * 100,
      currency: "INR",
      receipt: order._id.toString()
    };

    const razorpayOrder = await razorpay.orders.create(options); 

    order.paymentInfo = { orderId: razorpayOrder.id };
    await order.save();

    res.json({
      key: process.env.RAZORPAY_KEY_ID,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      razorpayOrderId: razorpayOrder.id
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
