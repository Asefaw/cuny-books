
const mongoose =  require('mongoose');

mongoose.connect('mongodb://adminuser:adminuser@ds035766.mlab.com:35766/cunybooks');
const Schema = mongoose.Schema;
const userSchema = new Schema({
	fullName: String,
	email: String,
	password: String
});
module.exports = mongoose.model('user', userSchema);

// module.exports = mongoose.model('User', userSchema);