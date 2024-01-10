const mongoose = require('mongoose');
const Category = require('./categorySchema.js')

const Schema= mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type : String,
        required:true
    },
    price:{
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
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required:true
    },
    in_stock:{
        type:Boolean,
        default:true
    },
    ingredients:[String]
});

const Dish = mongoose.model('Dish',Schema);
module.exports = Dish;

