const Cart = require('../models/cart');
const Transaction = require('../models/transaction');
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
		  description: "Charge for"+ req.user.email
		}, function(err, charge) {
		  if(err){
		  	req.flash('error_msg', err.message);
		  	res.redirect('checkout');
		  }
		  Cart.find(function(err, cart){
		  	if(err){
		  		res.send(err);
		  	}else{
		  		var transaction = new Transaction();
		  		var grandTotal = 0; 
		  		for(var i=0; i< cart.length; i++){ 
		  			transaction.book.push(cart[i].bookId);		  			
		          	grandTotal += cart[i].total; 
		        }
	  			transaction.buyer =  cart.buyer || req.user.email;
	  			transaction.date = Date.now();
	  			transaction.amount = grandTotal;

	  			transaction.save(function(err, trans){
	  				if(err){
	  					 res.send(err);
	  				}else{
	  				Cart.remove(function(err){
				    	if(err) throw err 
				    });  
	  				req.flash('success_msg', 'Order Placed!')
	      			res.redirect('/user/cart');
	      			}
	  			});		 		 
		  	}
		  });		    
		});
	}
}