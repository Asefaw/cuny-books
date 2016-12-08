var express = require('express');
var async = require('async');
var crypto = require('crypto');
var User = require('../models/user');
var nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');  //generates XOAUTH2 login tokens from provided Client and User credentials.
var xoauth2gen;


var router = express.Router();


router.get('/forgot', function(req, res) {
  res.render('forgot', {user: req.user});
});


router.post('/forgot', function(req, res, next) {
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
      User.findOne({ email: req.body.email }, function(err, user) {
        if (!user) {
          req.flash('error', 'No account with that email address exists.');
          return res.redirect('/forgot');
        } 

        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        user.save(function(err) {
          done(err, token, user);
        });
      });
    },
    function(token, user, done) {

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
        from: 'passwordreset@demo.com',
        subject: 'CUNYBooks Password Reset',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' + req.headers.host + '/reset/' + token + '\n\n' +
          'Your password reset link will be expired in 1 hour. If expires, please request a new link below.\n' +
          'http://' + req.headers.host + '/forgot' + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };

      transporter.sendMail(mailOptions, function(err) {
        req.flash('success_msg', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
        done(err, 'done');
      });
    }
  ], function(err) {
    if (err) return next(err);
    res.redirect('/forgot');
  });
});

module.exports = router;