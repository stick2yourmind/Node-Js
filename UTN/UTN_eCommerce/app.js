var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// Router handler
var productsRouter = require('./routes/products');
// Module to verify token
const jwt = require("jsonwebtoken");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// secret key
app.set("secretKey","10 2020");

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
// Application's routes
app.use('/products', productsRouter);



function validateUser(request,response,next){
  jwt.verify(request.headers["x-access-token"],request.app.get("secretKey"),function(err,decoded){
    if(err){
      response.json({message:err.message})
    }else{
      request.body.tokenData=decoded
      next()
    }
  })
}
app.validateUser = validateUser;

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
  //res.render('error');
  res.json({error: err.message});
});

module.exports = app;
