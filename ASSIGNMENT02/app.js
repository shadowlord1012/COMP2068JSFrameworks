var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var hbs = require('hbs');

//Enviroment variables
var configs = require('./configs/global');

//Passport Section
var passport = require('passport');
var session = require('express-session');
var githubStrat = require('passport-github2').Strategy;

//import the required models for passport to use
var User = require('./models/user');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var projectRouter = require('./routes/projects');
var accountRouter = require('./routes/accounts');
var materialRouter = require('./routes/materials');
var delieveryRouter = require('./routes/deliveries');


var app = express();

mongoose
.connect(configs.ConnectionStrings.MongoDB)
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

//Used to calculate total amounts in hbs
hbs.registerHelper("math",(lvalue,operator,rvalue) => {
  lvalue = parseFloat(lvalue);
  rvalue = parseFloat(rvalue);
  return {
    "+": lvalue + rvalue,
    "-": lvalue - rvalue,
    "*": lvalue * rvalue,
    "/": lvalue / rvalue,
    "%": lvalue % rvalue
  }[operator];
});

//Checks to see if 2 values are equal
hbs.registerHelper('buttonRemoverMaterials',(value) => {
  if(value.statusCost === "success")
    return;
  else    
    return new hbs.SafeString('<a href="/materials/'+value.projectId+'" class="btn btn-info btn-sm">Add Material</a>');
});

//rounds the number values to 2 decimal places
hbs.registerHelper('decimalNumber',(a) => {
  return Math.trunc(a*100)/100;
});

//to shorten the date and make it much more readable
hbs.registerHelper("toShortDate",(longDateValue) =>{
  return new hbs.SafeString(longDateValue.toLocaleDateString("en-CA"));
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: "InventoryManagementSystem", 
  resave: false,
  saveUninitialized: false,

}));

//passport configuration
app.use(passport.initialize());
app.use(passport.session());

//Passport stragtegies
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

console.log(configs.Authentication.GitHub.ClientID);
//Github strategy
passport.use(new githubStrat(
  //options object
  {
    clientID: configs.Authentication.GitHub.ClientID,
    clientSecret: configs.Authentication.GitHub.ClientSecret,
    callbackURL: configs.Authentication.GitHub.CallbackURL,
  },
  //callback function
  //profile is github profile
  async (accessToken, refreshToken, profile, done) => {
    //search use by ID
    const user = await User.findOne({oauthId: profile.id});
    //user exists (return user)
    if (user) {
      return done(null,user);
    }
    else {
      const newUser = new User({
        username: profile.username,
        oauthId: profile.id,
        oauthProvider: 'GitHub',
        created: Date.now()
      })

      //add to DB
      const savedUser = await newUser.save();
      //return
      return done(null,savedUser);
    }
  }
));



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/projects', projectRouter);
app.use('/accounts', accountRouter);
app.use('/materials',materialRouter);
app.use('/deliveries',delieveryRouter);

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
