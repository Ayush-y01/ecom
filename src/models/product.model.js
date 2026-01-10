const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    itemName:{
        type:String,
        require:true
    },
    brandName:{
        type:String,
        require:true
    },
    idelFor:{
        type:String,
        enum:["Men","Women","Unisex","Other"],
        default:""
    },
    articleNumber:{
        type:String,
        require:true,
        unique:true
    },
    itemDescription:{
        type:String,
        require: true
    },
    itemPrice:{
        type:Number,
        require:true
    },
    variants: [
    {
      size: Number,      
      color: String,   
      hex: String,
      stock: Number,
      images: [String]
    }
  ]
    
},{timestamps: true})

const productModel = mongoose.model("Product", productSchema);

module.exports = productModel;