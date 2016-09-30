var express = require('express');
var user = require('../models/user');
var router = express.Router();

router.get('/', function(req, res){
	res.render('signup');
});

router.post('/', function(req,res){
	var userInfo = {
		fullName: req.body.fullName,
		email: req.body.email,
		password: req.body.password,
		college: req.body.college
	}; 
	if(!req.body.terms) {
		console.log('Agreed to terms');
		res.render('signup', {status: {msg: 'You must agree with the terms to continue'}});
	}

	var newUser = new user(userInfo);

	 newUser.save(function(err){
	 	if(err){
	 		res.send('Error while saving user');
	 	}else{ 
	 		res.render('login',{status: {title: 'Account Created', msg: 'Login in using the email and password you just created.'}});
	 	}
	 });
    //res.send('successfully registered')
});

module.exports = router;
