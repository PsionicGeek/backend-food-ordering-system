const express = require('express')
const router = express.Router()
//===============================================================================================================================
const Category = require('../models/categorySchema')
const Dish = require('../models/dishSchema')
const User = require('../models/userSchema')
const Payment = require('../models/paymentSchema')
const Order = require('../models/orderSchema')

const { addDish, addCategory } = require('../controllers/adminController')
//===================================================================================================================================

router.post('/addDish', addDish)
router.post('/addCategory', addCategory)

//========================================================================================================================================
module.exports = router