const mongoose = require('mongoose');
const User = require('./userSchema')
const Dish = require('./dishSchema')
const Schema= mongoose.Schema({
    status:{
        type:Number,
        // required: true,
        default : 1
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
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        // required:true
    },
    total:{
        type:Number,
        // required:true
    },
    dishes:[
        {
            dish : {
                type:mongoose.Schema.Types.ObjectId,
                ref:'Dish'
            },
            dishName:{
                type:String,

            },
            quantity : {
                type : Number
            }
        }
    ]
});

const Order = mongoose.model('Order',Schema);
module.exports = Order;
