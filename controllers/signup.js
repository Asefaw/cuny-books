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
	var newUser = new user(userInfo);

	 newUser.save(function(err){
	 	if(err){
	 		res.send('Error while saving user');
	 	}else{ 
	 		res.render('login',{status: 'Account Created'});
	 	}
	 });
    //res.send('successfully registered')
});

module.exports = router;
