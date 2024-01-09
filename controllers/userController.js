const asyncHandler = require("express-async-handler");
const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

// controllers/authController.js
const signup = async (req, res) => {
  try {
    const { username, email, mobileNumber, address, password } = req.body;

    // Check if user with the given email or mobile number already exists
    const existingUser = await User.findOne({ $or: [{ email }, { mobileNumber }] });

    if (existingUser) {
      return res.status(400).json({ message: 'User with this email or mobile number already exists' });
    }

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


const signin= (req, res) =>{
    console.log("hello");
    res.send("Hello")
};
module.exports = authController = {
    signup,
    signin
};