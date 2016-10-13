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

// passport.use(new LocalStrategy(
//   function(email, password, done) { 
//   	User.getUserByEmail(email, function(err,user){
//   		if(err) throw err;
//   		if(!user){
//   			return done(null, false, {message: 'Unknown User'});
//   		}
//   		User.validatePassword(password, user.password, function(err, isMatch){
//   			if(err) throw err;
//   			if(isMatch){
//   				return done(null, user);
//   			}else{
//   				return done(null, false, {message: 'Invalid Password'});
//   			}
//   		});
//   	});
//   }));

// passport.serializeUser(function(user, done) {
//   done(null, user.id);
// });

// passport.deserializeUser(function(id, done) {
//   User.getUserById(id, function(err, user) {
//     done(err, user);
//   });
// });

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