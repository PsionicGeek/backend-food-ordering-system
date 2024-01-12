const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const Dish = require('../models/dishSchema')
const Order = require('../models/orderSchema')

const User = require("../models/userSchema");
const Category = require('../models/categorySchema')

//=====================================================================================================================================
const signup = async (req, res) => {
  try {
    const { username, email, mobileNumber, address, password, isAdmin = false } = req.body;

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
      isAdmin
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
//=====================================================================================================================================
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
    expires: new Date(Date.now() + (7 * 24 * 60 * 60 * 1000)),       
    //Date.now() gives date in "ms"...we need to keep cookie in browser for 1 week
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
//===========================================================================================================================================
//this will be implemented at frontend
//signout 
// const signout = async(req, res) => {
//   try {
//     res.clearCookie("user");
//     res.status(200).json({msg : 'Signout successful'});
//   }
//   catch (err){
//     res.status(400).json({msg : 'Signout not possible'})
//   }
// }
//============================================================================================================================================
const getAllOrders = async(req, res)=>{
  try{
    const { id } = req.params;
    const user = await User.findById(id).populate('orders')
    const orders = user.orders
    res.status(200).json(orders)
  }
  catch(err){
    res.status(400).json({msg : 'Cannot fetch your orders'})
  }
}
//===========================================================================================================================================
const searchDish = async(req, res)=>{
  try{
    const dishName = req.query.name;
    const foundDish = await Dish.findOne({name : dishName}).populate('category')
    res.status(200).json(foundDish)
  }
  catch(err){
    res.status(400).json({msg : 'Cannot search'})
  }
}
//==========================================================================================================================================
const bookOrder = async (req, res) => {
  try {
    const { user_id, dishList } = req.body;
    //dishList will be an array of object
    //each object will contain {id, quantity}

    let totalCost = 0;
    const dishes = [] 
    for (const dishObj of  dishList)
    {
      const dishId = dishObj.id;
      const dishName = dishObj.dishName
      const dishQuant = dishObj.quantity;
      
      const foundDish = await Dish.findById(dishId).populate('category');
      const newDishObj = { dish : foundDish, dishName: dishName, quantity : dishQuant };
      dishes.push (newDishObj)

      totalCost += (foundDish.price * dishQuant)
    }
    const foundUser = await User.findById(user_id)
    

    const order = await Order.create({
      status : 1,
      user : foundUser,
      total : totalCost, 
      dishes 
    });
    foundUser.orders.push(order)
    await foundUser.save()

    res.status(200).json(order);

  } 
  catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
//===================================================================================================================================================
const  getDishes = async (req, res) => {
  try {
    const dishes = await Dish.find().populate('category');
    console.log(dishes);
    res.json(dishes);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
//=======================================================================================================================================
const getUserDetails = async(req, res)=>{
  try{
    const { userId } = req.params;
    const foundUser = await User.findById(userId).populate({path : 'orders' , populate : { path : 'dishes.dish', model : 'Dish'}})
    res.status(200).json(foundUser);
  }
  catch (error) {
      // console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
}
//========================================================================================================================================
const getCategories = async(req, res)=>{
  try {
    const categories = await Category.find();
    res.status(201).json( categories);
} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
}
}
//=======================================================================================================================================
const getCategoryDishes = async (req, res)=>{
  try{
    const { id : categoryId } = req.params;
    const allDishes = await Dish.find().populate('category')
    let dishes = []
    for (let dish of allDishes)
    {
      if (dish.category.id == categoryId)
        dishes.push(dish)
    }
    res.status(200).json(dishes)
  }
  catch(err)
  {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
//=================================================================================================================
//update API
// const updateUser = async(req, res) => {
//   try{
//     const {userId} = req.params;
//     const{username, address, password} = req.body;
//     const user = await User.findById(userId);
//     user.username=username;
//     user.address=address;
//     user.password=password;
//     await user.save();
//     res.status(201).json(user)
//   } catch(error){
//     console.log(error);
//     res.status(500).json({error:'Internal Server Error'});
//   }
 
// }
//===================================================================================================================================
module.exports  = { signup, signin, getAllOrders, searchDish, bookOrder, getDishes, getUserDetails, getCategories, getCategoryDishes};