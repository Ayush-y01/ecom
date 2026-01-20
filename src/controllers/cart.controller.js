const cartModel = require('../models/cart.model')
const productModel = require("../models/product.model")

module.exports.addToCart = async (req, res, next) => {
  try {
    const { productId, sku, quantity } = req.body;

    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    const variant = product.variants.find(v => v.sku === sku);

    if (!variant) {
      return res.status(404).json({
        message: "Product variant not found"
      });
    }

    if (variant.stock < quantity) {
      return res.status(400).json({ message: "Not enough stock" });
    }

    let cart = await cartModel.findOne({ user: req.userId });

    if (!cart) {
      cart = await cartModel.create({
        user: req.userId,
        items: [{ product: productId, sku, quantity }]
      });
      return res.json(cart);
    }

    const itemIndex = cart.items.findIndex(
      i => i.product.toString() === productId && i.sku === sku
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, sku, quantity });
    }

    await cart.save();
    res.json(cart);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};


module.exports.getCart = async (req, res, next) => {
    const cart = await cartModel.findOne({user: req.userId}).populate("items.product")
    res.json(cart)
};

module.exports.updateQuantity = async (req, res, next) => {
    const {productId, sku , quantity } = req.body;

    const cart = await cartModel.findOne({user:userId});

    if (!cart) {
        return res.status(404).json({message:"cart not found"})
    }
    const item = await cartModel.find(
        i => i.product.toString() === productId && i.sku === sku
    )

    if (!item) {
        return res.status(404).json({
            message:"item not in cart"
        })
    }

    item.quantity = quantity;
    await cart.save();
    
    res.json(cart);
}

module.exports.removeItem = async (req,res,next) => {
    const {productId,sku} = req.body

    const cart = await cartModel.findOne({ user:req.userId });

    cart.items = cart.items.filter(
        i => !(i.product.toString() === productId && i.sku === sku)
    )
    await cart.save();  
    res.json(cart)
}

module.exports.clearCart = async (req, res, next ) => {
    await cartModel.findOneAndDelete({ user:req.userId });
    res.json({ message: "Cart cleared"})
}