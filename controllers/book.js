// const express = require('express'); 
// const Book = require('../models/book');
// const router = express.Router();


// router.get('/book/newBookForm', function(req, res){
// 	//cche if user is loged in
// 	if(req.user){
// 		res.render('newBookForm');
// 	}else{
// 		res.redirect('/user/login');
// 	}
	 
// })

// router.post('/book/new', function(req, res){
// 	// inputs 
// 		var owner = req.body.owner;
// 		var title = req.body.title;
// 		var isbn = req.body.isbn;
// 		var author = req.body.author;
// 		var edition = req.body.edition;
// 		var price = req.body.price;
// 		var quantity = req.body.quantity;  
// 	// input validation
// 	req.checkBody('title', 'Title is required').notEmpty();
// 	req.checkBody('isbn', 'ISBN # is required').notEmpty();
// 	req.checkBody('author', 'Author is required').notEmpty(); 
// 	req.checkBody('edition', 'Edition is required').notEmpty(); 
// 	req.checkBody('price', 'Price is required').notEmpty(); 
// 	req.checkBody('quantity', 'Qunatity is required').notEmpty(); 
// 	req.checkBody('owner', 'You Must Login before you this action').notEmpty(); 
// 	var errors = req.validationErrors();
// 	if(errors){
// 		res.render('newBookForm', {errors: errors});
// 	}else{
// 		var newBook = new Book({
// 			owner: owner,
// 			title: title,
// 			isbn: isbn,
// 			author: author,
// 			edition: edition,
// 			price: price,
// 			quantity: quantity
// 		});
// 		Book.saveNewBook(newBook, function(err, book){
// 			if(err) throw err; 
// 			req.flash('success_msg', 'Your Book Has Been Saved Click My Books to display');
// 			res.redirect('/user/userHome');
// 		});
// 	}

// });

// router.post('/book/search', function(req, res){
// 	var title = req.body.title;
// 	var isbn = req.body.isbn;

// 	Book.find({'title':title, 'isbn':isbn})
// 	.then(function(books){
// 		if(books.length){ 
// 			res.render('books', {books: books}); 
// 		}else{
// 			req.flash('error_msg', 'No Books Found');
// 			res.redirect('/');
// 		}
		 
// 	})
// })

// //get book for individual user
// router.get('/user/:user/books', function(req, res){
// 	if(req.user){
// 		var owner = req.params.user; 
// 		Book.find({'owner': owner})
// 	 	.then(function(books){ 
// 	 		res.render('userHome', {books: books});
// 	 	});
// 	}else{
// 		res.redirect('/user/login');
// 	}
	  
// });
// module.exports = router;