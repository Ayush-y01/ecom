const productModel = require('../models/product.model.js')

module.exports.createProduct = async({
    name,description,price,category,brand,color,size,stock,totalStock
}) => {
    if (!name || !description || !price || !category || !brand || !totalStock ) {
        throw new Error("All field are require!!")
    }

    const product = productModel.create({
        name,
        description,
        price,
        category,
        brand,
        variant:{
            color,
            size,
            stock
        },
        totalStock
    });

    return product;
}