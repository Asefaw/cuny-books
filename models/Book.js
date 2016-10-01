const mongoose = require('mongoose');
const db = require('../database/db'); // for db connection

const Schema = mongoose.Schema();

const bookSchema = new Schema{
	title: {type: String, required: true, lowercase: true},
	isbn: {type: String, required: true},
	autor: String,
	price: Number,
	type: String
};

module.exports = mongoose.model('book', bookSchema);