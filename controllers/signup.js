const express = require('express');
const User = require('../models/user');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const router = express.Router();

router.get('/signup', function(req, res){
	res.render('signup');
});

//register user
router.post('/signup', function(req, res){
	var fullName = req.body.fullName;
	var email = req.body.email; 
	var password = req.body.password; 

	// Validate the form inputs
	req.checkBody('fullName', 'Full Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail(); 
	req.checkBody('password', 'Password is required').notEmpty(); 
	 
	var errors = req.validationErrors();
	if(errors){
		res.render('signup',{
			errors: errors
		});
	};

	var newUser = new User({
	 	fullName: fullName,
	 	email: email, 
	 	password: password
 	});
	//check for email duplication
	User.find({'email':req.body.email},function(err, emailExist){
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
	 		res.render('signup', {status: {msg: req.body.email + ' Email Already Exsit'}});
	 	}
	});
	 
});

module.exports = router;
