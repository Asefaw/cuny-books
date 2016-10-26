const express = require('express');
const Book = require('../models/book');
const Offer = require('../models/offer');
const router = express.Router();

router.get('/user/dashboard', function(req, res){

	var user = {
		name: '',
		college: '',
		major: '',
		minor: '',
		relatedBooks: '',
		books: []
	};

	//cche if user is loged in
	if(req.user){
		user.name = req.user.fullName;
		user.college = req.user.college;
		user.major = req.user.major;
	}

	Book.getBooks(function(books) {
		user.books = books;
		Book.getUserBooks(user.name, function(listings) {
			user.listings = listings;
			var book_ids = [];
			for(var idx in listings) {
				book_ids.push(listings[idx]._id);
			}
			console.log(book_ids);
			Offer.getOffers(book_ids, function(offers) {
				console.log(offers);
				for(var idx in offers) {
					for(var key in user.listings) {
						if(offers[idx].book_id == user.listings[key]._id) {
							user.listings[key].offerCount++;
						}
					}
				}
				console.log('User listings');
				console.log(user.listings);
				Book.getRelBooks(user.major, function(relBooks) {
					user.relBooks = relBooks;
					// console.log(relBooks);
					showDashboard(user, res,req);
				});
			});
		});
	});
});

function showDashboard(user,res, req) {
	if(req.user){
		res.render('dashboard', user);
	}else{
		res.render('login');
	} 
	 
}

module.exports = router;
