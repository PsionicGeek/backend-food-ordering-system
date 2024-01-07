const mongoose = require('mongoose');
const Order = require('./orderSchema.js')
//==============================================================================
const userSchema = new mongoose.Schema({       
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique : true
    },
    password: {
        type: String,
        required: true,
    },
    address : {
        type : String,
        required : true,
    },
    isAdmin : {
        type : Boolean,
        default : false
    },
    orders : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Order'   
       }
    ]
})
//===================================================================================
const User = mongoose.model('user', userSchema)                          
module.exports = User                