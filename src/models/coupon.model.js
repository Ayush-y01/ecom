const mongoose = require('mongoose')

const couponSchema = new mongoose.Schema({
    code:{
        type:String,
        required:true,
        unique:true,
        uppercase:true
    },
    discountType:{
        type:String,
        enum:["FLAT","PERCENT"],
        required:true
    },
    discountValue:{
        type:Number,
        required:true
    },
    minOrderValue:{
        type:Number,
        default:0
    },
    expiry:{
        type:Date,
        required:true
    },
    isActive: {
        type:Boolean,
        default:true
    }
},{timestamps:true})


const couponModel = mongoose.model("Coupon", couponSchema)

module.exports = couponModel