const mongoose = require('mongoose');
const Order = require('./orderSchema.js')
//==============================================================================
const userSchema = new mongoose.Schema({       
    username: {
        type: String,
        required: true,
        unique: true
    },
    mobileNumber: {
        type: String,
        required: true,
        unique: true, 
        validate: {
          validator: function (value) {
            return /^\d{10}$/.test(value);
          },
          message: props => `${props.value} is not a valid mobile number! Please enter a 10-digit number.`,
        }
    },
    email: {
        type: String,
        unique : true
    },
    password: {
        type: String,
        required: true,
    },
    address : [
        {
        type : String,
        required : true,
        }
    ],
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