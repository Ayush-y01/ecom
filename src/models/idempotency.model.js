const mongoose = require('mongoose')

const schema = new mongoose.schema({
    key:{
        type:String,
        unique:true,
    },
    response:Object,
    createdAt:{
        type:Date,
        default:Date.now,
        expires:3600
    }
})

module.exports = mongoose.model("Idempotency",schema)