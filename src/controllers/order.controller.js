const Cart = require('../models/cart.model');
const Order = require("../models/order.model");
const Product = require("../models/product.model");

module.exports.placeOrder = async (req, res) => {
  try {
    const { address } = req.body;

    if (!address) {
      return res.status(400).json({ message: "Address required" });
    }

    const cart = await Cart.findOne({ user: req.userId })
      .populate("items.product");

    if (!cart || !cart.items || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let total = 0;
    const orderItems = [];

    for (let item of cart.items) {
      const product = item.product;

      if (!product) {
        return res.status(400).json({ message: "Product not found in cart" });
      }

      const variant = product.variants.find(v => v.sku === item.sku);

      if (!variant || variant.stock < item.quantity) {
        return res.status(400).json({
          message: `Stock not available for ${product.name}`
        });
      }

      const price = variant.price || product.basePrice;
      total += price * item.quantity;

      orderItems.push({
        product: product._id,
        sku: item.sku,
        quantity: item.quantity,
        price
      });
    }

    const order = await Order.create({
      user: req.userId,
      items: orderItems,
      totalAmount: total,
      address
    });

    /*  Reduce Stock */
    for (let item of cart.items) {
      await Product.updateOne(
        { _id: item.product._id, "variants.sku": item.sku },
        { $inc: { "variants.$.stock": -item.quantity } }
      );
    }

    /*  Clear Cart */
    await Cart.findOneAndDelete({ user: req.userId });

    return res.status(201).json(order);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};



module.exports.myOrders = async (req, res) => {
  const orders = await Order.find({ user: req.userId })
    .sort({ createdAt: -1 });

  res.json(orders);
};



module.exports.allOrders = async (req, res) => {
  const orders = await Order.find()
    .populate("user", "name email")
    .sort({ createdAt: -1 });

  res.json(orders);
};



module.exports.updateStatus = async (req, res) => {
  const { status } = req.body;

  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );

  res.json(order);
};
