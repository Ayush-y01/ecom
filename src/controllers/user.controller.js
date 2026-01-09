const { validationResult } = require('express-validator')
const userModel = require('../models/user.model.js')
const userService = require('../services/user.service.js')


module.exports.registerUser = async(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
        return res.status(400).json({errors: errors.array() });
    }

    const { firstName,lastName,email,password,mobileNumber} = req.body

    
    // const isUserAlreadyExist = userModel.findOne({ email });

    // if (isUserAlreadyExist) {
    //     return res.status(400).json({ message: "user Already Exist!!!"})
    // }

    const hashedPassword = await userModel.hashPassword(password) //this function also need to be done not dont yet...

    const user = await userService.createUser({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        mobileNumber
    })

    const token = user.generateAuthToken() // this not done yet we need to create this function....
    
    res.status(201).json({token, user})

}

module.exports.loginUser = async (req, res, next) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array() });
  }
  
  const { email, password } = req.body;

  const user = await userModel.findOne({ email }).select('+password');

  if (!user) {
    return res.status(401).json({message: 'User not found' });
  }
    
  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return res.status(401).json({message: 'Invalid password'});
  }

  const token = user.generateAuthToken();

  res.cookie('token', token);

  res.status(200).json({ token, user });
}

module.exports.userProfile = async (req, res, next) => {
  res.status(200).json(req.user);
}

module.exports.logoutUser = async (req, res, next) => {
  res.clearCookie('token')
  const token = req.cookies.token || req.headers.authorization.split(' ')[1];

  //LATER   HERE  we black list this token 

  res.status(200).json({message: "user Logout successfully"})
}