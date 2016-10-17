const express = require('express');
const authenticate = require('../middlewares/authentication');
const router = express.Router();
const User = require('../models/user');
const Book = require('../models/book');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

 //---user Authentication begins----
 
 router.get('/user/login', function(req, res, next) {  
  res.render('login');
});

router.post('/user/login',
  passport.authenticate('local', {
  	successRedirect:'index', 
  	failureRedirect:'login', 
  	failureFlash:true
  }),
  function(req, res) { 
    res.render('books');
  });
  
   //---user Authentication ends----
  
  //----user Logout begins-----
  router.get('/user/logout', function(req, res,next){
	req.logout();
	req.flash('success_msg', 'You have been logged Out');
	res.redirect('login');
});
 //----user Logout begins-----

// get user' home page
router.get('/user/userHome', function(req, res, next){
	res.render('userHome');
});
module.exports = router;