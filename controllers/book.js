const express = require('express');
const router = express.Router();

router.get('/books', function(req, res){
	res.render('books');
});

router.post('/books', function(req, res){
	res.render('books');
});

module.exports = router;