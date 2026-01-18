const userModel = require('../models/user.model')

module.exports = async function (req, res, next) {
    const user = await userModel.findById(req.userId)

    if (!user) {
        return res.status(401).json({message:" user not fount!!"})
    }
    if (user.role !== 'admin') {
        return res.status(401).json({message: "admin only"})
    }
    next();
}