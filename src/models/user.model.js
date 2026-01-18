const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require: true,
        minilength:[3, 'First must be at least 3 character long'],
    },
    email:{
        type:String,
        require:true,
        uniqe:true
    },
    password:{
        type:String,
        require:true,
        select: false,
        minilength:[3, 'Password must be at least 3 character long'],
    },
    mobileNumber:{
        type:String,
        require:true,
        minilength:[10, 'Phone number must be at least 3 character long'],
        
    },
    role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  }
},{timestamps:true})


userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '7d'});
    return token;
}
userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.statics.hashPassword = async function(password) {
    return await bcrypt.hash(password, 10);
}

const userModel = mongoose.model("User",userSchema)

module.exports = userModel;