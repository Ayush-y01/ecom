const express = require('express')
const router = express.Router();

const returnController = require('../controllers/return.controller')
const authMiddleware = require('../Middlewares/authMiddleware')

router.post('/:id/request',authMiddleware.authUser, returnController.requestReturn)

module.exports = router