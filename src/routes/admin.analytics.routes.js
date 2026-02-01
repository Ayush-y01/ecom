const express = require("express");
const router = express.Router();

const adminAnalyics = require('../controllers/admin.analytics.controller')
const admin = require('../Middlewares/admin')

router.get("/monthly-sales", admin, adminAnalyics.monthlySales);
router.get('/total-sales',admin, adminAnalyics.totalSales)
router.get("/sales-range", admin, adminAnalyics.salesByDateRange);

module.exports = router;
