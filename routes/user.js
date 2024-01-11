const express = require('express')
const router = express.Router()
//===============================================================================================================================
const Category = require('../models/categorySchema')
const Dish = require('../models/dishSchema')
const User = require('../models/userSchema')
const Payment = require('../models/paymentSchema')
const Order = require('../models/orderSchema')

const {signin, signup, getAllOrders, searchDish, bookOrder, getDishes } = require('../controllers/userController')
const { isLoggedIn } = require('../middleware')
//===================================================================================================================================

router.post("/signup", signup,);
router.get("/signin", signin);
// router.post('/signout', signout);
router.get('/allOrders/:id', isLoggedIn, getAllOrders)
router.get('/search', searchDish)
router.post('/bookOrder', isLoggedIn, bookOrder);
router.get('/getDishes', getDishes);

// router.put('/updateUser/:userId', isLoggedIn, updateUser )




//add "isLoggedIn" like this for authentication for every route that required auth
// router.get('/orders', isLoggedIn, (req, res)=>{
//     res.send('Hello')
// })

//======================================================================================================================================
module.exports = router