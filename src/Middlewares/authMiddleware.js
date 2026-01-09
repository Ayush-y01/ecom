const express = require('express')
const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model')

module.exports.authUser = async(req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1]
    

    if (!token) {
        return res.status(401).json({message: "invalid token!!"})
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        const user = await userModel.findById(decode._id)

        req.user = user;

         next();
    } catch (error) {
        return res.status(401).json({message:'invalid token'})
    }
}

