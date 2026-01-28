const { validationResult } = require('express-validator')
const productModel = require('../models/product.model.js');
const ProductService = require('../services/product.service.js');
const userModel = require('../models/user.model.js')

module.exports.createProduct = async (req, res, next) => {
   try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {   
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, brand, variants, description, basePrice, category } = req.body;

    if (!Array.isArray(variants) || variants.length === 0) {
      return res.status(400).json({
        message: "Variants must be a non-empty array"
      });
    }

    const exists = await productModel.findOne({ name, brand });
    if (exists) {
      return res.status(409).json({   
        message: "Product already exists"
      });
    }

    const skuSet = new Set();
    for (let v of variants) {
      if (!v.sku) {
        return res.status(400).json({
          message: "Each variant must have SKU"
        });
      }
      if (skuSet.has(v.sku)) {
        return res.status(400).json({
          message: "Duplicate SKU in variants"
        });
      }
      skuSet.add(v.sku);
    }

    const product = await productModel.create({
      name,
      description,
      basePrice,
      category,
      brand,
      variants
    });

    res.status(201).json({
      success: true,
      product
    });

  } catch (err) {
    next(err); // or res.status(500)
  }
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

module.exports.searchProduct = async (req, res, next) => {
    try {
        const {keyword, category,minPrice, maxPrice, page= 1 } = req.query

        const query = {};
        
        if(keyword){
            query.$text = {$search:keyword}
        }
        if (category) {
            query.category = category
        }

        if (minPrice || maxPrice) {
            query.basePrice = {}
            if(minPrice) query.baseprice.$gtr = Number(minPrice)
            if(maxPrice) query.basePrice.$lte = Number(maxPrice)
        }

        const limit = 10
        const skip = (page - 1) * limit;

        const products = await productModel.find(query)
            .skip(skip)
            .limit(limit);
        
        const total = await productModel.countDocuments(query)


        res.json({
            success: true,  
            total,
            page:Number(page),
            data: products  
        })
    } catch (error) {
        return res.status(500).json({
            messsage:error.message
        })
    }
}

module.exports.getSingleProduct = async (req, res, next) => {
    const product = await productModel.findById(req.params.id);
    if (!product) {
        return res.status(404).json({
            message:"product not found"
        })
    }
    return res.status(200).json({
        product 
    })
}