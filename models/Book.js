const mongoose = require('mongoose');
const db = require('../database/db'); // for db connection

 

const Book = mongoose.Schema({
	owner: {
		type: String
	},
	title: {
		type: String, 
		required: true, 
		lowercase: true
	},
	isbn: {
		type: String, 
		required: true
	},
	autor: {
		type: String
	},
	price: {
		type: Number
	}, 
	quantity: {
		type: String
	}
});

module.exports = mongoose.model('Book', Book);

module.exports.saveBook = function(owner,newBook,callback){
	newBook.save(callback);
}

module.exports.findBooksByISBN = function(isbn, callback){
	var query = {isbn: isbn};
	Book.findOne(query,callback);
}

module.exports.findBooksByTitle = function(title, callback){
	var query = {title: title};
	Book.findOne(query,callback);
}