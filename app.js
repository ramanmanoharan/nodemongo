var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var flash = require('connect-flash');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/product')
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));
var app = express();

app.use(require("express-session")({
secret:"This is Raman",//decode or encode session
    resave: false,          
    saveUninitialized:false    
}));
app.use(flash());
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var employees = require('./routes/employees');
var adminRouter = require('./routes/admin');

var slider = require('./routes/slider');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/employees', employees);
app.use('/slider', slider);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;