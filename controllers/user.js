const express = require('express');
const router = express.Router();
const user = require('../models/user');

// const mongoose = require('mogoose');
// mongoose.connect('mongodb://adminuser:adminuser@ds035766.mlab.com:35766/cunybooks');

router.get('/', function(req, res, next){
	user.find()
	.then(function(userList){
		res.render('users', {items: userList});
	});
});

module.exports = router;