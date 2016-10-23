const mongoose = require('mongoose');
const db = require('../database/db'); // for db connection

const transactionSchema = mongoose.Schema({
	buyer: {
		type: String
	},
	book_id: {
		type: String
	},
	date: {
		type: Number
	},
	quantity: {
		type: Number
	}
});

var transaction = module.exports = mongoose.model('Transaction', transactionSchema);

