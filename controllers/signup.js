var express = require('express');
var user = require('../models/user');
var router = express.Router();

router.get('/signup', function(req, res){
	res.render('signup');
});

router.post('/signup', function(req,res){
	var userInfo = {
		fullName: req.body.fullName,
		email: req.body.email,
		password: req.body.password,
		college: req.body.college
	};  

	var newUser = new user(userInfo); 

	// check if the new users email already exist
	//if i does redirect to signup page with error message
	//if not save new user
	 user.find({'email':req.body.email},function(err, email){
	 	if(!email.length){
	 		 newUser.save(function(err){
			 	if(err){
			 		res.send('Error while saving user');
			 	}else{ 
			 		res.render('login',{status: {title: 'Account Created', msg: 'Login in using the email and password you just created.'}});
			 	}
	 	});  
	 	}else{
	 		res.render('signup', {status: {msg: req.body.email + ' Already Exsit'}});
	 	}
	 });
});

module.exports = router;
