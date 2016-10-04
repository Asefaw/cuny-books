const express = require('express'); 
const User = require('../models/user');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const router = express.Router();

//process logout

router.get('/logout', function(req, res,next){

	// Destroy the session after the user is signout
	req.session.destroy(function(err) {
		if(err) {
			console.log(err);
		} else {
			req.logout();
			// req.flash('success_msg', 'You have been logged Out');
			res.redirect('/login');
		}
	});

})

module.exports = router;