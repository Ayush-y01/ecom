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

    const token = product.generateProductToken()

    res.status(201).json({token, product})
}

module.exports.updateProduct = async (req, res, next) => {
    try {
        const findProduct = await productModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new:true }
        );


        if (!findProduct) {
            return res.status(404).json({ success:false ,message:'Product not Found!!!'})
        }

        return res.status(200).json({success:true, message:"product update successfully",data: findProduct})
        
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:error.message
        })
    }
}

module.exports.deleteProduct = async (req, res, next) => {
    try {
        const deleteproduct = await productModel.findByIdAndDelete(req.params.id)

        if (!deleteproduct) {
            return res.status(404).json({
                success:false,
                message:"produt not found"
            })
        }

        return res.status(200).json({
            success:true,
            message:"product delete successfully.."
        })
        
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:error.message
        })
    }
}