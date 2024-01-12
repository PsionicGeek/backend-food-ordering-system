const Category = require('../models/categorySchema')
const Dish = require('../models/dishSchema');
const User = require('../models/userSchema');
const Order = require('../models/orderSchema')
const bcrypt = require('bcrypt');
//====================================================================================================================================
const userList = require('../seeds/users')
const categoryList = require("../seeds/categories");
const dishList = require("../seeds/dish");
//==========================================================================================================================================
const addDish = async(req, res)=>{
    const dishObject  = req.body;

    const category_name = dishObject.category_name;
    delete dishObject.category_name

    const foundCategory = await Category.findOne({name : category_name})
    if (foundCategory == null)
       res.status(401).json({msg : 'Category not found'})
    dishObject.category = foundCategory;

    const newDish = await Dish.create(dishObject);

    if (newDish)
      res.status(200).json(newDish)
    else
      res.status(401).json({ message: 'Cannot add dish (Invalid or missing details)' })
}
//===============================================================================================================================
const addCategory = async(req, res)=>{
    const categoryObject  = req.body;
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
//====================================================================================================================================
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
      const categories = await Category.find();
      res.status(201).json( categories);
  } catch (error) {
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
const deleteUser = async (req, res) =>{
  try{
    const {userId} = req.body;
    const result = await User.deleteOne({id: userId});
    res.status(201).json({message:"Successfully deleted", result});
  }
  catch(error){
    res.status(500).json({error: 'Internal Server Error'});
  }
}
//==================================================================================================================================
const deleteDish = async (req, res) => {
  try{
    const {dishId} = req.params;
    if(await Dish.findById(dishId)){
      const result = await Dish.deleteOne({_id:dishId});
      res.status(200).json({message:"Dish Successfully Deleted", result});
    } else {
      res.status(400).json({message:"Dish Id not found"});
    }

  } catch(error){
    console.log(error);
    res.status(500).json({message:"Internal Server Error"});
  }
}
//============================================================================================================================================
const deleteCategory = async(req, res) => {
  try{
    const {categoryId} = req.params;
    if(await Category.findById(categoryId)){
      const deletedCat = await Category.deleteOne({id: categoryId});
    res.status(200).json({message:"Category Successfully Deleted", deletedCat});
    }
    else{
      res.status(400).json({message:"Category Id not found"});
    }
  } catch(error){
    res.status(500).json({message:"Internal Server Error"});
  }
}
//==============================================================================================================================================
const changeStatus = async (req, res) =>{
  try{

    const {orderId, status} = req.params;
    console.log(orderId, status)
    const order = await Order.findById(orderId);

    order.status = status;
    await order.save()
    res.status(201).json(order);
  } catch(error){
    res.status(500).json({error: 'Internal Server Error'});
  }
}
//==========================================================================================================================================
const getUserDetails = async(req, res)=>{
  try{
    const { userId } = req.params;
    const foundUser = await User.findById(userId).populate({path : 'orders' , populate : { path : 'dishes.dish', model : 'Dish'}})
    res.status(200).json(foundUser);
  }
  catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
  }
}
//========================================================================================================================================
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
module.exports = { addDish, addCategory, getAllUsers,
                getEarning, getAllCategories, getAllDishes,
                getAllOrders, seedUsers, seedCategory,
                seedDish, deleteUser, changeStatus, deleteDish,
                deleteCategory, getUserDetails}
