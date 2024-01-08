//"dishes": {
//  "id": 1,
//  "name": "Dish 1",
//  "description": "Dish 1 description",
//  "image": "image.jpg",
//  "price": 10,
//  "created_at": "2016-11-22T15:28:52.000Z",
//  "updated_at": "2016-11-22T15:28:52.000Z",
//  "deleted_at": null,
//  "category_id": 1,
//  "in_stock": true,
//  "ingredients": ["ingredient 1", "ingredient 2", "ingredient 3"]
// },
//

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
    category_id:{
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

