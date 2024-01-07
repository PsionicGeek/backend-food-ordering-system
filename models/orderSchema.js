//"orders": {
//      "id": 1,
//      "status": 1,
//      "created_at": "2016-11-22T15:28:52.000Z",
//      "updated_at": "2016-11-22T15:28:52.000Z",
//      "deleted_at": null,
//      "user_id": 1,
//     "total": 10,
//      "dishes": [
//        {
//          "dish_id": 1,
//          "quantity": 1
//        }
//      ]
//  },
// "status": {
//  "1": "pending",
//  "2": "in progress",
//  "3": "ready",
//  "4": "delivered",
//  "5": "cancelled"
//
//
// },

const mongoose = require('mongoose');
const Schema= mongoose.Schema({
    status:{
        type:Number,
        required:true
    },
    created_at:{
        type:Date,
        default:Date.now
    },
    updated_at:{
        type:Date,
        default:Date.now
    },
    deleted_at:{
        type:Date,
        default:null
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    total:{
        type:Number,
        required:true
    },
    dishes:[
        {
        dish_id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Dish',
            required:true
        },
        quantity:{
            type:Number,
            required:true,
            default:1
        }
    }]
});

const Order = mongoose.model('Order',Schema);
module.exports = Order;
