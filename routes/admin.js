const express = require('express')
const router = express.Router()
//===============================================================================================================================
const Category = require('../models/categorySchema')
const Dish = require('../models/dishSchema')
const User = require('../models/userSchema')
const Payment = require('../models/paymentSchema')
const Order = require('../models/orderSchema')

const { addDish, addCategory, getAllUsers, getEarning, getAllCategories, getAllDishes, getAllOrders, seedUsers } = require('../controllers/adminController')
//===================================================================================================================================

router.post('/addDish', addDish)
router.post('/addCategory', addCategory)
router.get('/getUsers', getAllUsers)
router.get('/getEarning', getEarning)
router.get('/getCategories', getAllCategories);
router.get('/getDishes', getAllDishes);
router.get('/getOrders', getAllOrders)

//ONE TIME ROUTES
router.get('/seedUsers', seedUsers)


//========================================================================================================================================
module.exports = router