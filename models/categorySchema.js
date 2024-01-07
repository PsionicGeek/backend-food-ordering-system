
//"category": {
//  "id": 1,
//  "name": "CategorySchema 1",
//  "description": "CategorySchema 1 description",
//  "image": "image.jpg",
//  "created_at": "2016-11-22T15:28:52.000Z",
//  "updated_at": "2016-11-22T15:28:52.000Z",
//  "deleted_at": null
//
//
// },

const mongoose = require('mongoose');
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
        data:Buffer,
        contentType:String,
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
});

const Category = mongoose.model('CategorySchema',Schema);
module.exports = Category;
