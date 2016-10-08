const express = require('express');
const router = express.Router();

router.get('/books', function(req, res){

	var param = {
		name: req.user.fullName,
		college: req.user.college
	}
	res.render('books', param);
});

router.post('/books', function(req, res){
	res.render('books');
});

module.exports = router;