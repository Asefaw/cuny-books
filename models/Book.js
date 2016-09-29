const mongoose = require('mongoose');
const db = require('../models/db'); // for db connection

const Book = mongoose.Schema();

const bookSchema = new Book({
	title: {type: String, required: true, lowercase: true},
	isbn: {type: String, required: true},
	autor: String,
	price: Number,
	type: String
});

module.exports = mongoose.model('book', bookSchema);