const express = require('express');
const { body } = require('express-validator')
const router = express.Router()
const userController = require('../controllers/user.controller.js')


router.post('/register',[
    body('firstName').isLength({ min:3 }).withMessage('First name must at least 3 character'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min:3 }).withMessage('password must be at least 3 character long'),
    body('mobileNumber').isLength({ min:10, max:10}).withMessage('Invalid Mobile Number')
],
    userController.registerUser
)

router.post('/login',[
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min:3 }).withMessage(' password must ab at least 3 character long')
],
    userController.loginUser
)

module.exports = router;