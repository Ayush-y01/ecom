const express = require('express')
const { body } = require('express-validator')
const router = express.Router()
const productModel = require('../models/product.model.js')
const productController = require('../controllers/product.controller.js')

router.post('/product',[
    body("name").notEmpty().withMessage("Product name require"),
    body("description").notEmpty(),
    body("price").isFloat({min:3}),
    body("category").notEmpty(),

    body("variants").isArray({min:1}),
    body("variants.*.color").notEmpty(),
    body("variants.*.size").notEmpty(),
    body("variants.*.stock").isInt({min:3})
] , productController.createProduct )

router.put('/update', productController.updateProduct)

router.put('/delete',productController.deleteProduct)


module.exports = router