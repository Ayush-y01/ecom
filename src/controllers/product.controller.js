const { validationResult } = require('express-validator')
const productModel = require('../models/product.model.js');
const ProductService = require('../services/product.service.js');
const userModel = require('../models/user.model.js')

module.exports.createProduct = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
        return res.status(400).json({ errors: errors.array() })
    }

    const {name,description,price,category,brand,color,size,stock,totalStock} = req.body;

    const product = await ProductService.createProduct({
        name,
        description,
        price,
        category,
        brand,
        variant:{
            color,
            size,
            stock
        },
        totalStock
    })

    const token = product.generateAuthToken()

    res.status(201).json({token, product})
}