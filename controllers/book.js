const express = require('express');
const router = express.Router();

router.get('/', function(req, res){
	res.render('books');
});

router.post('/', function(req, res){
	res.render('books');
});

module.exports = router;