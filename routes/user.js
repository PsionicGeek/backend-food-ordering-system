const express = require('express')
const router = express.Router()
//===============================================================================================================================
const Category = require('../models/categorySchema')
const Dish = require('../models/dishSchema')
const User = require('../models/userSchema')
const Payment = require('../models/paymentSchema')
const Order = require('../models/orderSchema')

//=========================================================================================================================================

const {signin, signup, getAllOrders, searchDish, bookOrder, getDishes, getUserDetails, getCategories, getCategoryDishes } = require('../controllers/userController')
const { isLoggedIn } = require('../middleware')
//===================================================================================================================================

router.post("/signup", signup,);
router.post("/signin", signin);
// router.post('/signout', signout);
router.get('/allOrders/:id', isLoggedIn, getAllOrders)
router.get('/search', searchDish)
router.get('/getDishes', getDishes);
router.get('/getCategories', getCategories);
router.get('/getCategoryDishes/:id', getCategoryDishes);


router.get('/userDetails/:userId', isLoggedIn, getUserDetails);
router.post('/bookOrder', isLoggedIn, bookOrder);


// router.put('/updateUser/:userId', isLoggedIn, updateUser )
//this will work only if all the details (including not-changed and changed) are passed in the req-body

//======================================================================================================================================
module.exports = router
