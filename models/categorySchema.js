const mongoose = require('mongoose');
const Schema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required : true
    },
    image:{
        type : String,
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
const Category = mongoose.model('Category',Schema);
module.exports = Category;
