const express = require('express')
const router = express.Router()

const adminReturnController = require('../controllers/adminReturn.controller')
const authMiddleware = require('../Middlewares/authMiddleware')

router.post('/:id/approve',authMiddleware.authUser, adminReturnController.approveReturn)

module.exports = router