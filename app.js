const express = require('express')
const mongoose = require('mongoose')
const app = express()
const dotenv = require('dotenv')
dotenv.config({path : '.env'})

//=================================================================================
app.use(express.json());
const adminRouter = require('./routes/admin')


//==================================================================================

app.use('/admin', adminRouter)


//=================================================================================
//CONNECT TO DATABASE

mongoose.connect(process.env.DB_URL)
  .then(() => { console.log('CONNECTED TO DATABASE :)') })
  .catch((err) => { console.log('CONNECTION TO DATABASE FAILED :(', err) })


//===========================================================================
app.listen(5000, ()=>{
    console.log('Server Started at port 5000')
})