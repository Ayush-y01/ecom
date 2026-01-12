const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
        trim:true,
        index:true
    },
    description:{
        type:String,
        require: true
    },
    price:{
        type:Number,
        require:true,
        min: 0
    },
    category:{
        type:String,
        require: true,
        index:true
    },
    brand: {
      type: String
    },

    images: [
      {
        type: String
      }
    ],
    variant:{

        color:{
            type:String,
            require: true,
            trim:true
        },
        size:{
            type:String,
            require:true,
            trim:true
        },
        stock:{
            type:Number,
            require:true,
            min: 0
        }
    },
    totalStock:{
        type:Number,
        default:0
    },
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

const productModel = mongoose.model("Product", productSchema);

module.exports = productModel;