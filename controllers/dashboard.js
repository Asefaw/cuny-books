const express = require('express');
const Book = require('../models/book');
const router = express.Router();

router.get('/user/dashboard', function(req, res){

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
		abc(params, res,req);
	});
});

function abc(params,res, req) {
	if(req.user){
    res.render('dashboard', params);
  }else{
    res.render('login');
  } 
	 
}

module.exports = router;
