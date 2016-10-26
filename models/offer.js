const mongoose = require('mongoose');
const db = require('../database/db'); // for db connection

const offerSchema = mongoose.Schema({
	user: {
		type: String
	},
	book_id: {
		type: String
	},
	message: {
		type: String
	},
	date: {
		type: Number
	}
});

var Offer = module.exports = mongoose.model('Transaction', offerSchema);

module.exports.saveNewOffer = function(newOffer, callback){
	newOffer.save(callback);
}
module.exports.getOffers = function(book_id, callback) {
	var query = {
		book_id: { $in: book_id}
	};
	return Offer.find(query).then(callback);
}

