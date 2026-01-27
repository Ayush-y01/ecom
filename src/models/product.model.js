const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');



const variantSchema = new mongoose.Schema({
    size:{
        type:String
    },
    color:{
        type:String
    },
    price:{
        type:Number
    },
    stock:{
        type:Number,
        default:0
    },
    reserved: {
        type: Number,
        default: 0
    },
    sku:{
        type:String,
        unique:true,
        required:true
    }
})

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        index:true
    },
    brand:{
        type:String
    },
    description:{
        type:String,
    },
    basePrice:{
        type:Number,
    },
    category:{
        type:String,
        required: true,
        index:true
    },
    images: [
      {
        type: String
      }
    ],
    variants:[variantSchema],
    isActive:{
        type:Boolean,
        default:true,
    }
    
},{timestamps: true})


productSchema.index({
    name:"text",
    category:"text",
    brand:"text"
});
productSchema.index(
    { name: 1, brand: 1 },
    { unique:true }
)


productSchema.methods.generateProductToken = function () {
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET, {expiresIn: '12h'})
    return token;
}

const productModel = mongoose.model("Product", productSchema);

module.exports = productModel;