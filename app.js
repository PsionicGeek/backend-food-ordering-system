const express = require('express')
const mongoose = require('mongoose')
const app = express()
const dotenv = require('dotenv');
const userRouter = require("./routes/user")
dotenv.config({path : '.env'})
const cookieParser = require('cookie-parser')
//=================================================================================
app.use(express.json());
app.use(cookieParser())
const adminRouter = require('./routes/admin')


//==================================================================================

app.use('/admin', adminRouter);
app.use('/user', userRouter);


//=================================================================================

//CONNECT TO DATABASE
mongoose.connect(process.env.DB_URL)
  .then(() => { console.log('CONNECTED TO DATABASE :)') })
  .catch((err) => { console.log('CONNECTION TO DATABASE FAILED :(', err) })


//===========================================================================
app.listen(8000, ()=>{
    console.log('Server Started at port 8000')
})