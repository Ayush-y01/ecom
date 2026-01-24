const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true
    },
    rating:{
        type:Number,
        min:1,
        max:5,
        required:true
    },
    comment:String
},{timestamps:true})

reviewSchema.index({ user:1,product:1 },{ unique:true })

const reviewModel = mongoose.model("Review", reviewSchema)

module.exports = reviewModel