var express = require('express');
var User = require('../models/user');
var bcrypt = require('bcryptjs');
var async = require('async');
var nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');  //generates XOAUTH2 login tokens from provided Client and User credentials.
var xoauth2gen;
var router = express.Router();

router.get('/reset/:token', function(req, res) {
  User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
    if (!user) {
      req.flash('error', 'Password reset token is invalid or has expired.');
      return res.redirect('/forgot');
    }
    res.render('reset', {
      user: req.user
    });
  });
});


router.post('/reset/:token', function(req, res) {
  async.waterfall([
    function(done) {
      User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
        if (!user) {
          req.flash('error', 'Password reset token is invalid or has expired.');
          return res.redirect('back');
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        bcrypt.genSalt(10, function(err, salt) {
          bcrypt.hash(user.password, salt, function(err, hash) {
              user.password = hash;
              User.update({_id: user.id}, {password: user.password}, function(err){
                  done(err, user);
              });
          });
       });

      });
    },
    function(user, done) {
       
       xoauth2gen = xoauth2.createXOAuth2Generator({  //to initialize Token Generator
         user: 'cunybooks3@gmail.com',
         clientId: '154181963287-1fep26r070epelqponeo5catvps88jkk.apps.googleusercontent.com',
         clientSecret: '1JSGkKcsleFIiMZ1yI1g4NTO',
         refreshToken: '1/nxXmU-zt4wSSGAVMLr1-kWVx2f45lE-pNZGt6_5jdi0'
      });

      // Get HTTP accessToken if a cached token is expired
      xoauth2gen.getToken(function(err, token, accessToken){
          if(err) {
              return console.log(err);
            } else {
              xoauth2gen.accessToken = accessToken;
            }
      });

      //If a new token value has been set, 'token' event is emitted.
      xoauth2gen.on("token", function(token){
          console.log("User: ", token.user); // e-mail address
          console.log("New access token: ", token.accessToken);
          console.log("New access token timeout: ", token.timeout); // TTL in seconds
      });

      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          xoauth2: xoauth2gen
        },
        tls: { rejectUnauthorized: false }
      });

      var mailOptions = {
        to: user.email,
        subject: 'Your password has been changed',
        text: 'Hello,\n\n' +
          'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
      };

      transporter.sendMail(mailOptions, function(err) {
        req.flash('success_msg', 'Success! Your password has been changed.');
        res.redirect('/user/login');
        done(err);
      });
    }
  ], function(err) {
     if (err)
      console.log(err);
  });
});

module.exports = router;