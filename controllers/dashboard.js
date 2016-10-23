const express = require('express');
const Book = require('../models/book');
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
			console.log(listings);
			Book.getRelBooks(user.major, function(relBooks) {
				user.relBooks = relBooks;
				console.log(relBooks);
				showDashboard(user, res,req);
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
