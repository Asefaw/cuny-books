var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;

router.get('/', function(req, res){
	res.render('index');
//   MongoClient.connect("mongodb://adminuser:adminuser@ds035766.mlab.com:35766/cunybooks", function(err,db){
//   if(!err){
//     res.render('index', { status: 'Connected' });
//   } else{
//     res.render('index', { status: 'Databse Connection Faild' });
//   }
// }); 
});

module.exports = router;