const express = require('express')
const router = express.Router()
//===============================================================================================================================
const Category = require('../models/categorySchema')
const Dish = require('../models/dishSchema')
const User = require('../models/userSchema')
const Payment = require('../models/paymentSchema')
const Order = require('../models/orderSchema')
const userController = require('../controllers/userController')
//===================================================================================================================================

router.post(
    "/signup",
    userController.signup,
    
  );
  
  router.get("/signin", userController.signin);


//======================================================================================================================================
module.exports = router