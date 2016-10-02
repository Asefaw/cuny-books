var express = require('express');
var user = require('../models/user');
var router = express.Router();

//Handle GET:
router.get('/', function(req, res){
	res.render('signup');
});

// Handle POST:
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
			res.render('signup', {status: {msg: err.message}});
		}else{ 
			res.render('login',{status: {title: 'Account Created', msg: 'Login in using the email and password you just created.'}});
		}
	});
    //res.send('successfully registered')

});

module.exports = router;
