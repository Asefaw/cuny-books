const express = require('express'); 
const User = require('../models/user');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const router = express.Router();


router.get('/login', function(req, res, next) {  

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

router.post('/login',
  passport.authenticate('local', {successRedirect:'/books', failureRedirect:'/login', failureFlash:true}),
  function(req, res) { 
    res.render('books');
  });

module.exports = router;

 