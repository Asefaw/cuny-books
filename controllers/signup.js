 var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
//get home


router.get('/signup', function(req, res){
	res.render('signup');
});

//register user
router.post('/signup', function(req, res){
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
module.exports = router;