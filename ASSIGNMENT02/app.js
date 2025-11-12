var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var hbs = require('hbs');

//Enviroment variables
require("dotenv").config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var projectRouter = require('./routes/projects');
var accountRouter = require('./routes/accounts');
var materialRouter = require('./routes/materials');


var app = express();

mongoose
.connect(process.env.CONNECTION_STRING_MONGODB)
  .then(() => console.log("Connected To MongoDB!"))
  .catch((err) => console.error("Connection Error:",err));

//Hbs helper functions
hbs.registerHelper("createOptionElement", (currentvalue, selectedvalue) =>{
if(currentvalue === selectedvalue){
  return new hbs.SafeString("<option selected>"+currentvalue+"</option>");
}
else {
  return new hbs.SafeString("<option>"+currentvalue+"</option>");
}
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/projects', projectRouter);
app.use('/accounts', accountRouter);
app.use('/materials',materialRouter);

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
