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
