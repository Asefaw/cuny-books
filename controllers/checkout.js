const Cart = require('../models/cart');
const stripe = require("stripe")("sk_test_M16yA8LngWinOo4nI1qPMXPj");

module.exports =  {
	index(req, res){
		if(req.user){
			res.render('checkout');
		}else{
			res.render('login');
		}
		 
	},
	processCheckout(req, res){
		if(!req.user){
			return res.redirect('/user/login');
		}
		
		stripe.charges.create({
		  amount: req.session.totalAmount,
		  currency: "usd",
		  source: req.body.stripeToken, // obtained with Stripe.js
		  description: "Charge for michael.smith@example.com"
		}, function(err, charge) {
		  if(err){
		  	req.flash('error_msg', err.message);
		  	res.redirect('checkout');
		  }
		  // empty cart
		  Cart.remove(function(err){
	    	if(err) throw err 
	      });  
	      req.flash('success_msg', 'Order Placed!')
	      res.redirect('/user/dashboard');
		});
	}
}