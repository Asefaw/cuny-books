const mongoose =  require('mongoose');
const db = require('../database/db.js'); // for db connection
 
const User = mongoose.Schema;

const userSchema = new User({
	fullName: {type:String, required: true},
	email: {type:String, required: true},
	password: String,
	college: {type: String, required: true}
});
module.exports = mongoose.model('user', userSchema);

// module.exports = mongoose.model('User', userSchema);