const mongoose = require('mongoose')

const orderItemSchema = new mongoose.Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        require: true
    },
    sku:{
        type:String,
        require:true
    },
    quantity:{
        type:Number,
        require:true
    },

    price:{
        type:Number,
        require:true
    }
})

const orderSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true
    },
    items:[orderItemSchema],
    
    totalAmount:{
        type:Number,
        require:true
    },
    status:{
        type:String,
        enum:["placed","shipped","Delivered","Cancelled"],
        default:"placed"
    },
    address:{
        type:String,
        require:true
    }
},{timestamps:true})

const orderModel = mongoose.model("Order", orderSchema);

module.exports = orderModel;