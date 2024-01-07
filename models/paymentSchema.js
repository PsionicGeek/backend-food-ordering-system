//"payment": {
//  "payment_id": 1,
//  "amount": 10,
//  "user_id": 1,
//  "order_id": 1,
//  "created_at": "2016-11-22T15:28:52.000Z"
// }
//
//
//},
const mongoose = require('mongoose');
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
