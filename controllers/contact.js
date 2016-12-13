const express = require('express');
var nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');  //generates XOAUTH2 login tokens from provided Client and User credentials.
var xoauth2gen;


module.exports = {
	registerRouter() {
		const router = express.Router();

		router.get('/', this.index);
		router.post('/', this.submit);
		router.get('/sent', this.sent);
		return router;
	},
	index(req, res) {
		res.render('contact');
	},
	submit(req, res) {
	
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
			from: req.body.email,
			to: 'cunybooks3@gmail.com',
			subject: req.body.subject,
			text: 'Name: ' + req.body.name + '\nEmail: ' + req.body.email + '\n\n' + req.body.message
		};

		transporter.sendMail(mailOptions, function(err, info) {
			if(err) {
				return console.log(err);
			}

			console.log('Message sent: ' + info.accepted);
			res.redirect('contact/sent');
			
			transporter.close();
		});
	},
	sent(req, res) {
		res.render('contactSent');
	},
};