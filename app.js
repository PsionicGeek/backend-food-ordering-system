const express = require('express')
const mongoose = require('mongoose')
const app = express()
const dotenv = require('dotenv');
const userRouter = require("./routes/user")
dotenv.config({path : '.env'})

//=================================================================================
app.use(express.json());
const adminRouter = require('./routes/admin')


//==================================================================================

app.use('/admin', adminRouter);
app.use('/user', userRouter);


//=================================================================================
//CONNECT TO DATABASE

mongoose.connect( "mongodb://localhost:27017/TastyDB")
  .then(() => { console.log('CONNECTED TO DATABASE :)') })
  .catch((err) => { console.log('CONNECTION TO DATABASE FAILED :(', err) })


//===========================================================================
app.listen(8000, ()=>{
    console.log('Server Started at port 8000')
})