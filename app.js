var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//mongodb
var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert'); 
var dbUrl = 'mongodb://adminuser:adminuser@ds035766.mlab.com:35766/cunybooks';
//mongoose.connect(dbUrl);

//controllers
var index = require('./controllers/index');
var  signup = require('./controllers/signup');
var login = require('./controllers/login');
const book = require('./controllers/book');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade'); 


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));


app.use('/', index);
app.use('/signup', signup);
app.use('/login', login);
app.use('/book', book);
//mongodb
MongoClient.connect("mongodb://adminuser:adminuser@ds035766.mlab.com:35766/cunybooks", function(err,db){
  if(!err){
    console.log("Connected");
  } else{
    console.log("Databse Connection Faild");
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
