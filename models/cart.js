const mongoose = require('mongoose');
const db = require('../database/db'); // for db connection

const cartSchema = mongoose.Schema({
    buyer: {
        type: String,
        required: true
    },
    book_id: {
        type: String,
        required: true
    },
    count: {
        type: Number
    }
});

module.exports = mongoose.model('Cart', cartSchema);