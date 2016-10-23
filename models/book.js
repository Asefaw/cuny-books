const mongoose = require('mongoose');
const db = require('../database/db'); // for db connection



const bookSchema = mongoose.Schema({
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
		required: true,
        unique: true	},
	author: {
		type: String
	},
	edition: {
		type: String
	},
	price: {
		type: Number
	},
	quantity: {
		type: String
	},
	image: {
		type: String
	},
	major: {
		type: String
	},
	sold: {
		type: Boolean,
		default: false
	}
});

bookSchema.index({title: 'text', isbn: 'text'});

var Book = module.exports = mongoose.model('Book', bookSchema);

module.exports.saveNewBook = function(newBook, callback){
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

module.exports.getUserByOwner = function(owner, callback){
	var query = {owner: owner};
	return Book.findOne(query, callback);
}

module.exports.getBooks = function(callback) {
	Book.find().then(callback);
}

module.exports.getUserBooks = function(owner, callback) {
	var query = {owner: owner};
	// return Book.find(query).exec(callback);		//With err param (err, results)
	return Book.find(query).then(callback);		//Without err param(results)
}

module.exports.getRelBooks = function(major, callback) {
	var query = {major: major};
	return Book.find(query).then(callback);
}