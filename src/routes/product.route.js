const express = require('express')
const { body } = require('express-validator')
const router = express.Router()
const productModel = require('../models/product.model.js')
const productController = require('../controllers/product.controller.js')

router.post('/product',[
    body('itemName').isLength({ min:3 }).withMessage('Product must be at least 3 character long'),
    body('brandName').isLength({ min:3 }).withMessage('brand Name must be at least 2 character long'),
    //idelFor
    body('articleNumber').isLength({ min:5 }).withMessage('article Number must be at least 5 character long'),
    body('itemDescription').isLength({ min:10 }).withMessage('Description must be require'),
    body('price').isLength({ min:1 }).withMessage('Price must be require'),

], productController.product )


module.exports = router