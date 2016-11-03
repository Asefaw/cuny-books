const express = require('express');
const Book = require('../models/book');
const User = require('../models/user');

module.exports = {
  index(req, res) {
      res.render('carts', {error_msg: 'Feature to be Implemented....'});
  }  
};