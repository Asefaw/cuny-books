const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Book = require('../models/book');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
// const mongoose = require('mogoose');
// mongoose.connect('mongodb://adminuser:adminuser@ds035766.mlab.com:35766/cunybooks');


router.get('/user/signup', function(req, res){
	res.render('signup');
});
 

 //--------user registration begins-----
router.post('/user/new', function(req, res){
	var fullName = req.body.fullName;
	var email = req.body.email; 
	var password = req.body.password; 
	var college = req.body.college;

	// Validation
	req.checkBody('fullName', 'Full Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail(); 
	req.checkBody('password', 'Password is required').notEmpty(); 
	req.checkBody('college', 'College is required').notEmpty(); 
	req.checkBody('terms', 'Must Agree With Terms').notEmpty(); 

	var errors = req.validationErrors();
	if(errors){
		res.render('signup',{
			errors: errors
		});
	}else{
		 var newUser = new User({
		 	fullName: fullName,
		 	email: email, 
		 	password: password,
		 	college: college
		 });

		 User.find({'email':email},function(err, emailExist){
	 	if(!emailExist.length){	 		 

			User.createUser(newUser, function(err, user){
			 	if(err){
			 		throw err;
			 	}else{
			 		console.log(user);
			 		res.render('login',{status: {title: 'Account Created', msg: 'Login in using the email and password you just created.'}}); 
			 	}
			});
				 
	 	}else{
	 		res.render('signup', {status: {msg: 'A User with Email: '+email + ' Already Exsit'}});
	 	}
	});
	}
 }); 
 
 //--------user registration ends-----
 
 
 //---user Authentication begins----
 
 router.get('/user/login', function(req, res, next) {  
  res.render('login');
});

passport.use(new LocalStrategy(
  function(email, password, done) { 
  	User.getUserByEmail(email, function(err,user){
  		if(err) throw err;
  		if(!user){
  			return done(null, false, {message: 'Unknown User'});
  		}
  		User.validatePassword(password, user.password, function(err, isMatch){
  			if(err) throw err;
  			if(isMatch){
  				return done(null, user);
  			}else{
  				return done(null, false, {message: 'Invalid Password'});
  			}
  		});
  	});
  }));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

router.post('/user/login',
  passport.authenticate('local', {
  	successRedirect:'userHome', 
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