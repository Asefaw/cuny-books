const express = require('express');
const Book = require('../models/book');
const Transaction = require('../models/transaction');

module.exports = {
	registerRouter() {
		const router = express.Router();
		router.get('/:user/orders', this.index);  
		return router;
	},

	index(req, res){
		if(req.user){
			Transaction.find({'buyer': req.params.user}, function(err, orders){
				if(err){
					res.json(err);
				}
				res.render('myOrders', {orders: orders});
			}); 
		}else{
			res.render('login');
		}
	}
}
