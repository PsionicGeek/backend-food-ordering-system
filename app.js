var createError = require('http-errors');
var express = require('express');
var path = require('path');

var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
//=======================================================================================================================
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config({ path: './env' })
//==========================================================================================================================
//MIDDLEWARES
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});
//======================================================================================================================================
//CONNECTION WITH THE DATABASE
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => { console.log('CONNECTED TO DATABASE :)') })
  .catch((err) => { console.log('CONNECTION TO DATABASE FAILED :(', err) })








//====================================================================================================================================
module.exports = app;
