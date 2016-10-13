var express = require('express');
var router = express.Router();

router.get('/', function(req, res){

	if(req.user) {
		req.session.name = req.user.fullName;
	}

	res.render('index', { name: req.session.name});
});

module.exports = router;
