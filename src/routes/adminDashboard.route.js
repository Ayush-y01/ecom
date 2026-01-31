const express = require('express')
const router = express.Router()

const adminDashboadController = require('../controllers/adminDashboard.controller')
const admin = require('../Middlewares/admin')
const authMiddleware = require('../Middlewares/authMiddleware')

router.get('/dashboard', admin, adminDashboadController.dashboardStats)
router.get('/orders', admin, adminDashboadController.allOrders)
router.put('/order/:id/status', admin, adminDashboadController.updateOrderStatus)
router.put('/order/:id/cancel',admin, adminDashboadController.cancelOrder)
router.get('/low-stock', admin, adminDashboadController.lowStockProducts)
router.get('/product/:id/toggle', admin, adminDashboadController.toggleProduct)


module.exports = router