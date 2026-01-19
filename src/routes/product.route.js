const express = require('express')
const { body } = require('express-validator')
const router = express.Router()
const productModel = require('../models/product.model.js')
const productController = require('../controllers/product.controller.js')
const { authUser } = require('../Middlewares/authMiddleware.js')
const admin = require('../Middlewares/admin.js')

router.post('/',[
    body("name").notEmpty().withMessage("Product name require"),
    body("description").notEmpty(),
    body("price").isFloat({min:3}),
    body("category").notEmpty(),
] , authUser,admin,productController.createProduct )

router.put('/:id',authUser,admin, productController.updateProduct)

router.delete('/:id',authUser,admin, productController.deleteProduct)

router.get('/search', productController.searchProduct)

//public -----------

router.get("/", productController.searchProduct)
router.get("/:id", productController.getSingleProduct)


module.exports = router