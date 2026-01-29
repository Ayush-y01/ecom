const crypto = require("crypto");
const mongoose = require("mongoose");
const Order = require("../models/order.model");
const Product = require("../models/product.model");

module.exports.razorpayWebhook = async (req, res) => {

  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

  const signature = req.headers["x-razorpay-signature"];

  const expected = crypto
    .createHmac("sha256", secret)
    .update(req.body)
    .digest("hex");

  if (expected !== signature) {
    return res.status(400).json({ message: "Invalid signature" });
  }

  const event = JSON.parse(req.body.toString());

  if (event.event !== "payment.captured") {
    return res.json({ ok: true });
  }

  const payment = event.payload.payment.entity;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const order = await Order.findOne({
      "paymentInfo.orderId": payment.order_id
    }).session(session);

    if (!order || order.isPaid) {
      await session.abortTransaction();
      return res.json({ ok: true });
    }

    for (let item of order.items) {
      await Product.updateOne(
        {
          _id: item.product,
          "variants.sku": item.sku,
          "variants.stock": { $gte: item.quantity }
        },
        { $inc: { "variants.$.stock": -item.quantity } },
        { session }
      );
    }

    order.isPaid = true;
    order.paidAt = new Date();
    await order.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.json({ success: true });

  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).send("fail");
  }
};
