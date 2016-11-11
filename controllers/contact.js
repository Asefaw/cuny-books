const express = require('express');
var nodemailer = require('nodemailer');


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
		var transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: 'cunybooks3@gmail.com',
				pass: 'ctpgroup3'
			},
			tls: { rejectUnauthorized: false}
		});


		var mailOptions = {
			from: req.body.email;
			to: 'cunybooks3@gmail.com',
			subject: req.body.subject,
			text: 'Name: ' + req.body.name + '\nEmail: ' + req.body.email + '\n\n' + req.body.message
		};

		transporter.sendMail(mailOptions, function(err, info) {
			if(err) {
				return console.log(err);
			}

			console.log('Message sent: ' + info.response);
			res.redirect('contact/sent');
			
			transporter.close();
		});
	},
	sent(req, res) {
		res.render('contactSent');
	},
};