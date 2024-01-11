const Category = require('../models/categorySchema')
const Dish = require('../models/dishSchema');
const User = require('../models/userSchema');
const Order = require('../models/orderSchema')
const bcrypt = require('bcrypt');
//=======================================================================================================================
const userList = require('../seeds/users')
const categoryList = require("../seeds/categories");
const dishList = require("../seeds/dish");
//=============================================================================================================================
const addDish = async(req, res)=>{
    const dishObject  = req.body; //the passed category name must exist
  
    //extract the category name
    const category_name = dishObject.category_name;
    delete dishObject.category_name
  
    //find the category in document
    const foundCategory = await Category.findOne({name : category_name})
    if (foundCategory == null)
       res.status(401).json({msg : 'Category not found'})
    dishObject.category = foundCategory;
  
    //create a new dish
    const newDish = await Dish.create(dishObject);
  
    if (newDish)
      res.status(200).json(newDish)
    else
      res.status(401).json({ message: 'Cannot add dish (Invalid or missing details)' })
}
//===============================================================================================================================
const addCategory = async(req, res)=>{
    const categoryObject  = req.body;
    //create a new category
    const newCategory = await Category.create(categoryObject);
    if (newCategory)
        res.status(200).json(newCategory)
    else
        res.status(401).json({ message: 'Cannot add category (Invalid or missing details)' })
}
//====================================================================================================================================
const getAllUsers = async(req, res)=>{
  try {
    const allUsers = await User.find({}).populate({path : 'orders' , populate : { path : 'dishes', model : 'Dish'}})
    res.status(200).json(allUsers)
  }
  catch(err)
  {
    res.status(401).json({msg : 'Can not fetch users'})
  }
}
//===============================================================================================================================
const getEarning = async(req, res)=>{
  try{
    const allOrders = await Order.find({})
    let totalPrice = 0;
    for (let i = 0; i < allOrders.length; i++)
       totalPrice  += allOrders[i].total;
    
    res.status(200).json({totalEarning : totalPrice})

  }
  catch(err)
  {
    res.status(401).json({msg : 'Cannot fetch earnings'})
  }
}
//================================================================================================================================
const getAllCategories = async (req, res) => {
  try {
      // Your authentication logic goes here (check for admin authorization)

      // Fetch all categories from the database
      const categories = await Category.find();

      // Send the response
      res.status(201).json( categories);
  } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};
//==================================================================================================================================
const getAllDishes = async (req, res) => {
  try {
      const dishes = await Dish.find({}).populate('category')
      res.status(201).json( dishes );
  } 
  catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
  }
};
//================================================================================================================================
const getAllOrders = async (req, res) => {
  try {
      const orders = await Order.find({}).populate({path : 'dishes.dish', model : 'Dish'})
      res.status(201).json(orders);
  } 
  catch (error) 
  {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
///===========================================================================================================================


//ONE TIME CONTROLLERS
const seedUsers = async(req, res)=>{
  let newUserList = [];
  for (user of userList){
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password=hashedPassword;
    newUserList.push(user);
  }
    await User.insertMany(userList)
    res.status(200).json({msg : 'Added all users successfully'})
}

const seedCategory = async(req, res)=>{
  await Category.insertMany(categoryList)
  res.status(200).json({msg : 'Added all categories successfully'})
}

const seedDish = async(req, res)=>{
  await Dish.insertMany(dishList)
  res.status(200).json({msg : 'Added all Dishes successfully'})
}





//=======================================================================================================================================
module.exports = { addDish, addCategory, getAllUsers, getEarning, getAllCategories, getAllDishes, getAllOrders, seedUsers, seedCategory, seedDish }