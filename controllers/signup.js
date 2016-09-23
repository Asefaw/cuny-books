var express = require('express');
var router = express.Router();


router.get('/', function(req, res){
	res.render('signup');
});

router.post('/', function(req,res){
	var users = [];
	var user = req.body;
	users.push({
      name: user.name,
      age: user.age
    });
    res.send('successfully registered')
});

module.exports = router;
