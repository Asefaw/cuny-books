const express = require('express');
const Book = require('../models/book');
const router = express.Router();

router.get('/dashboard', function(req, res){

	var params = {
		name: '',
		college: '',
		major: '',
		minor: '',
		relatedBooks: '',
		books: []
	};

	//cche if user is loged in
	if(req.user){
		params.name = req.user.fullName;
		params.college = req.user.college;
	}

	Book.getBooks(function(books) {
		params.books = books;
		console.log(1);
		abc(params, res);
	});
});

function abc(params,res) {

	res.render('dashboard', params);
}

module.exports = router;
