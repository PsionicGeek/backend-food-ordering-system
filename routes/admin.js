const express = require('express')
const router = express.Router()
//===============================================================================================================================

const Category = require('../models/categorySchema')
const Dish = require('../models/dishSchema')
const User = require('../models/userSchema')
const Payment = require('../models/paymentSchema')
const Order = require('../models/orderSchema')

//================================================================================================================================

const { addDish, addCategory, getAllUsers, getEarning, getAllCategories, 
    getAllDishes, getAllOrders, seedUsers, seedCategory, seedDish, deleteUser, 
    changeStatus, deleteDish, deleteCategory, getUserDetails } = require('../controllers/adminController')

//===================================================================================================================================

router.post('/addDish', addDish)
router.post('/addCategory', addCategory)

router.get('/getUsers', getAllUsers)
router.get('/getEarning', getEarning)
router.get('/getCategories', getAllCategories);
router.get('/getDishes', getAllDishes);
router.get('/getOrders', getAllOrders)

//DELETE Routes
router.delete('/deleteUser', deleteUser);
router.delete('/deleteDish/:dishId', deleteDish);
router.delete('/deleteCategory/:categoryId', deleteCategory);


//Update Routes
router.put('/updateStatus/:orderId/:status', changeStatus)


//ONE TIME ROUTES
router.get('/seedUsers', seedUsers)
router.get('/seedCategory', seedCategory);
router.get('/seedDish', seedDish);
router.get('/user/:userId', getUserDetails)


//========================================================================================================================================
module.exports = router