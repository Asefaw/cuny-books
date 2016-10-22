var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('express-handlebars');
var mongoose = require('mongoose');
//Passport Authentication
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// require db.js to initialize connection for mongoose
const db = require('./database/db');


// Use session for the website.
var MongoStore = require('connect-mongo')(session);

//controllers
const index =  require('./controllers/index');
const books =   require('./controllers/books');
const users =   require('./controllers/users');
// const api =    require('./controllers/api');
const login_logout =   require('./controllers/login_logout');
const dashboard = require('./controllers/dashboard');

var app = express();

// Set local variable title, Tips: local variables can be used in the view template
app.locals.title = 'CUNY Books';

 // Use session for the website.
app.use(session({
  secret: 'foo',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection}),      // use the mongoose connection to store session
}));

app.engine('hbs', hbs({extname:'hbs', defaultLayout:'layout.hbs',layoutsDir: __dirname + '/views/layouts'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.set('title', 'cunybooks');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));
// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// Express Validator for validating user form
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));
// Connect Flash
app.use(flash());

// Global Varibale used for passport
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

//controllers
app.use(login_logout);
app.use(index);
app.use(dashboard);


//api routes
app.use('/api/books', books.index); 
app.use('/books/newBookForm', books.newbook);
app.use('/books/new', books.create);
app.use('/books/:user/books', books.myBooks);
 app.use('/books/:id', books.show);
app.use('/books/:id/delete', books.remove);
app.use('/books/:id/update', books.update);
app.use('/api/users', users.showAll);
app.use('/users/:id', users.show);
app.use('/users/signup', users.index);
app.use('/users/new', users.create);
app.use('/users/:email/delete', users.delete);
app.use('/users/update:email', users.update);
app.use('/book/search', books.search);
app.use('/book/searchAll', books.searchAll);

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
