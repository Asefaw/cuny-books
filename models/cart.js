const mongoose = require('mongoose');
const db = require('../database/db'); // for db connection

const cartSchema = mongoose.Schema({
    buyer: {
        type: String,
        required: true
    },
    book: {
        type: String,
        required: true
    },
    quantity: {
        type: Number
    },
     total: {
        type: Number
     }
});

module.exports = mongoose.model('Cart', cartSchema);
module.exports.addBook = function(book, callback){
    book.save(callback);
} 