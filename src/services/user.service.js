const userModel = require('../models/user.model.js')


module.exports.createUser = async({
    firstName,lastName,email,password,mobileNumber
}) =>{
    if (!firstName || !email || !password || !mobileNumber) {
        throw new Error('All field are require!!!');
    }


    const user = userModel.create({
        firstName,
        lastName,
        email,
        password,
        mobileNumber
    })
    return user;
}