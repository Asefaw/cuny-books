const mongoose = require('mongoose');
const db = require('../database/db'); // for db connection

const transSchema = mongoose.Schema( {
   buyer: {
       type: String,
       required: true
   },
   book_id: {
       type: String,
       required: true
   },
   date: {
       type: Date,
       default: Date.now
   },
   amount: {
       type: Number,
       required: true
   }
   // we may need to save customer's credit card info
});

module.exports = mongoose.model('Transaction', transSchema);
