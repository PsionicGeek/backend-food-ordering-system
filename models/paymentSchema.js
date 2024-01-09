const mongoose = require('mongoose');
const User = require('./userSchema')
const Order = require('./orderSchema')
const Schema= mongoose.Schema({
    payment_id:{
        type:Number,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    order_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Order',
        required:true
    },
    created_at:{
        type:Date,
        default:Date.now
    },
});
const Payment = mongoose.model('Payment',Schema);

module.exports = Payment;
