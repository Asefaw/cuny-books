const mongoose = require('mongoose');
const db = require('../database/db'); // for db connection

const Book = mongoose.Schema();

const bookSchema = new Book({
	owner:String,
	title: {type: String, required: true, lowercase: true},
	isbn: {type: String, required: true},
	autor: String,
	price: Number,
	type: String,
	quantity: String
});

module.exports = mongoose.model('book', bookSchema);

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