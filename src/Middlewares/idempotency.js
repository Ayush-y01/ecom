const Idempotency = require('../models/idempotency.model.js')

module.exports = async (req , res, next) => {
    const key = req.headers['idempotency-key']
    if (!key) {
        return next()
    }
    const old = await Idempotency.findOne({ key, user: req.userId })

    if (old) {
        return res.json(old.response)
    }
    req.idempotencyKey = key
    next()
}