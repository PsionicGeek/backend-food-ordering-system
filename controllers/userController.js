const asyncHandler = require("express-async-handler");
const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

//===================================================================================================================
// controllers/authController.js
const signup = async (req, res) => {
  try {
    const { username, email, mobileNumber, address, password } = req.body;

    // Check if user with the given email or mobile number already exists
    const existingUser = await User.findOne({ $or: [{ email }, { mobileNumber }] });

    if (existingUser) {
      return res.status(400).json({ message: 'User with this email or mobile number already exists' });
    }

    console.log(username)
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      mobileNumber,
      address,
      password: hashedPassword, // Save the hashed password
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
//==============================================================================================================
//sign in
const getToken = (user) => {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '40d',
    }
  );
  return token;
};

const signin= async(req, res) =>{
  const userObject = req.body;
  const { email, password } =  userObject
  const foundUser = await User.findOne({ email });
  
  if (foundUser && (await bcrypt.compare(password, foundUser.password))) 
  {
    const token = getToken(foundUser);
    const responseObj = {
      id: foundUser.id,
      email: foundUser.email,
      name: foundUser.name,
      address: foundUser.address,
      isAdmin: foundUser.isAdmin,
      token,
    }

    const options =  {
    expires: new Date(Date.now() + (7 * 24 * 60 * 60 * 1000)),       //Date.now() gives date in "ms"...we need to keep cookie in browser for 1 week
    //we need to add 1 week [in ms] to the current date
    httpOnly : true
  
   }
   const userObj = {
    token : token,
    user_id : foundUser.id
   }
   res.status(200).cookie("user", userObj, options).json(responseObj)
   return;
  }
  else
    res.status(400).json({msg : 'User not registered'})
};
//=============================================================================================================================
//signout 
const signout = (req, res) => {
  try {
    res.clearCookie("user");
    res.status(200).json({msg : 'Signout successful'});
  }
  catch (err){
    res.status(400).json({msg : 'Signout not possible'})
  }
}
//================================================================================================================================
module.exports  = { signup, signin, signout };