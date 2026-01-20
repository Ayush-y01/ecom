const express = require('express')
const { body } = require('express-validator')
const router = express.Router()
const cartController = require('../controllers/cart.controller')
const authMiddleware = require('../Middlewares/authMiddleware')


router.post('/add', authMiddleware.authUser, cartController.addToCart)
router.get("/",authMiddleware.authUser,cartController.getCart)
router.put('/update',authMiddleware.authUser,cartController.updateQuantity)
router.delete('/remove',authMiddleware.authUser,cartController.removeItem)
router.delete('/clear',authMiddleware.authUser,cartController.clearCart)


module.exports = router;