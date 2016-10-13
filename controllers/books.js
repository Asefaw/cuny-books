const express = require('express'); 
const Book = require('../models/book');
const router = express.Router();

module.exports = {
    index(req, res){
        Book.find()
        .then(function(err, book){
            if(err){
                res.status(500).json(err);
            }else{
                res.status(200).json(book);
            }
        });
    },
    search(req, res){
        Book.find({'title':req.body.title, 'isbn': req.body.isbn}, function(books){
            if(books){
                res.render('books', {books: books});
            }else{
                req.flash('error_msg', 'No Books Found');
                res.redirect('/');
            }
        }); 
    },
    //render form to adda new book
    newbook(req, res){
        if(req.user){
		    res.render('newBookForm');
    	}else{
    		res.redirect('/user/login');
    	}
    },
    //show books for individual user
    myBooks(req, res){
        if(req.user){ 
		    Book.find({'owner': req.params.user})
	 	    .then(function(books){ 
	 		    res.render('userHome', {books: books});
	 	    });
    	}else{
    		res.redirect('/user/login');
    	}
    },
    show(req, res){
        Book.find({'isbn': req.params.isbn})
        .then(function(err, book){
            if(err){
                req.flash('error_msg', 'No Books Found');
                res.redirect('/');
            }else{
                res.render('books', {books: book})
            }
        })
    }, 
    create(req, res){
        // inputs 
		var owner = req.body.owner;
		var title = req.body.title;
		var isbn = req.body.isbn;
		var author = req.body.author;
		var edition = req.body.edition;
		var price = req.body.price;
		var quantity = req.body.quantity;  
    	// input validation
    	req.checkBody('title', 'Title is required').notEmpty();
    	req.checkBody('isbn', 'ISBN # is required').notEmpty();
    	req.checkBody('author', 'Author is required').notEmpty(); 
    	req.checkBody('edition', 'Edition is required').notEmpty(); 
    	req.checkBody('price', 'Price is required').notEmpty(); 
    	req.checkBody('quantity', 'Qunatity is required').notEmpty(); 
    	req.checkBody('owner', 'You Must Login before you this action').notEmpty(); 
    	var errors = req.validationErrors();
    	if(errors){
    		res.render('newBookForm', {errors: errors});
    	}else{
    		var newBook = new Book({
    			owner: owner,
    			title: title,
    			isbn: isbn,
    			author: author,
    			edition: edition,
    			price: price,
    			quantity: quantity
    		});
    		Book.saveNewBook(newBook, function(err, book){
    			if(err) throw err; 
    			req.flash('success_msg', 'Your Book Has Been Saved Click My Books to display');
    			res.redirect('/user/userHome');
    		});
    	}
    },
    update(req, res){
        Book.findBooksByISBN(req.params.isbn, function(err, book){
            if(err){
                res.status(500).json(err);
            }else{
                book.title    = req.body.title;
                book.isbn     = req.body.isbn;
                book.edition  = req.body.edition;
                book.author   = req.body.author;
                book.price    = req.body.price;
                book.qunatity = req.body.quantity;
                Book.save(function(err, updatedBook){
                    if(err){
                        res.status(500).json(err);
                    }else{
                        res.status(200).json(updatedBook);
                    }
                });
            }
            
        });
    },
    remove(req, res){ 
        Book.remove({'isbn': req.params.isbn}, function(err, deleted){
            if(err){
                console.log(err);
                res.status(500).json(err);
            }
            res.send('done');
        })
    	   
    }
};

