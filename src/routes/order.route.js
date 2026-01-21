const express = require('express')
const { body } = require('express-validator')
const router = express.Router()
const orderController = require("../controllers/order.controller")
const authMiddleware = require('../Middlewares/authMiddleware')
const admin = require("../Middlewares/admin")

router.post("/", authMiddleware.authUser, orderController.placeOrder)
router.get("/my",authMiddleware.authUser, orderController.myOrders)

router.get("/", authMiddleware.authUser,admin,orderController.allOrders )
router.get("/:id/status" ,authMiddleware.authUser,admin,orderController.updateStatus)


module.exports = router

