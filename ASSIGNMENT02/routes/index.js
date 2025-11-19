var express = require('express');
var router = express.Router();
const passport = require('passport');
const User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Inventory Management Systems',user: req.user});
});

//Login get Method
router.get('/login', (req,res,next) => {
  //if null then set to an empty array
  let messages = req.session.messages || []; 

  //Clear messages after retrieving
  req.session.messages = [];
  res.render('login', {title:"Log in to your account",user: req.user,messages:messages});
});

//Post method for login
router.post('/login', passport.authenticate("local", {
  successRedirect: "/projects",
  failureRedirect: "/login",
  failureMessage: "Invalid Login",
}));

//Register get method
router.get('/register', (req,res,next) =>{
    res.render('register', {title: 'Create An Account', user: req.user});
});

//Register post method
router.post("/register", (req,res,next) =>{
  User.register(
    new User({username: req.body.username}),
    req.body.password, 
    (err, newUser) => {
      if(err) {
        console.log(err);
        return res.redirect("/register");
      }
      else {
        req.login(newUser, (error) => {
          res.redirect('/projects');
        });
      }
    }
  );
});

//Logout Get method
router.get('/logout',(req,res,next) => {
  req.logOut((error) => {
    res.redirect('/login');
  });
});

//Get for github
router.get('/github', passport.authenticate("github", {scope: ["user:email"]}));

//get github call back
router.get('/github/callback', 
  passport.authenticate("github",
    {
      successRedirect: "/projects",
      failureRedirect: "/login"
    }
  ))

module.exports = router;
