const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const hbs = require('express-handlebars');
const mongoose = require('mongoose');
//Passport Authentication
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// require db.js to initialize connection for mongoose
const db = require('./database/db');

// Use session for the website.
const MongoStore = require('connect-mongo')(session);

//controllers
const index =  require('./controllers/index');
const books =   require('./controllers/books');
const users =   require('./controllers/users');
const carts =    require('./controllers/carts');
const offers = require('./controllers/offers');

const forgot = require('./controllers/forgot');
const reset = require('./controllers/reset');
const login_logout =   require('./controllers/login_logout');
const dashboard = require('./controllers/dashboard');

const about = require('./controllers/about');
const contact = require('./controllers/contact');
const checkout = require('./controllers/checkout');
const app = express();

// Set local variable title, Tips: local variables can be used in the view template
app.locals.title = 'CUNY Books';

app.use(favicon(__dirname + '/public/images/favicon.ico'));

 // Use session for the website.
app.use(session({
  secret: 'foo',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection}),      // use the mongoose connection to store session
}));

//Custom express-handlebar helper functions
var helpers = require('./customHelpers');

app.engine('hbs', hbs({extname:'hbs', defaultLayout:'layout.hbs',layoutsDir: __dirname + '/views/layouts', helpers: helpers}));
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
// app.use(session({
//     secret: 'secret',
//     saveUninitialized: true,
//     resave: true
// }));

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next){
  res.locals.login = req.isAuthenticated();
  res.locals.session = req.session;
  next();
})
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
app.use(forgot);
app.use(reset);
app.use(login_logout);
app.use(index);
app.use(dashboard);


//api routes
app.use('/api/books', books.index); 
app.use('/books/newBookForm', books.newbook);
app.use('/books/new', books.create);
app.use('/book/:user/books', books.myBooks);
// app.use('/books/:id', books.show);
app.use('/books/:id/delete', books.remove);
app.use('/books/:id/update', books.update);
app.use('/api/users', users.showAll);
app.use('/users/:id', users.show);
app.use('/user/signup', users.index);
app.use('/user/new', users.create);
app.use('/users/:email/delete', users.delete);
app.use('/users/update:email', users.update);
app.use('/book/search', books.search);
app.use('/book/searchAll', books.searchAll);

//checkout
app.use('/user/cart', carts.index);
app.use('/cart/add', carts.add);
app.use('/cart/remove/:id', carts.remove);
app.use('/cart/empty', carts.emptyCart);
app.use('/books/:id', books.show);
app.use('/api/offers', offers.index);
app.use('/book/offers/new', offers.newOffer);
app.use('/cart/checkout', checkout.index);
app.use('/cart/processCheckout', checkout.processCheckout);

//about
app.use(about);

//contact
app.use('/contact', contact.registerRouter());

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
