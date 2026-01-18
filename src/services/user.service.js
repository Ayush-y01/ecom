const userModel = require('../models/user.model.js')


module.exports.createUser = async({
    name,email,password,mobileNumber
}) =>{
    if (!name || !email || !password || !mobileNumber) {
        throw new Error('All field are require!!!');
    }


    const user = userModel.create({
        name,
        email,
        password,
        mobileNumber
    })
    return user;
}