const express = require('express');
const Book = require('../models/book');
const User = require('../models/user');
const Cart = require('../models/cart');

function loadShoppingCart(res){
    Cart.find(function(err, cart){ 
        if(err)
            res.render('carts', {'error_msg': 'Error loading your cart'});
        res.render('carts', {cart: cart});
    });
};

var book_title, buyer, price; //holds book properties
module.exports = {
    
    index(req, res){
        if(req.user){
            loadShoppingCart(res);
        }else{
            res.redirect('user/login');
        }
    },
    
  add(req, res) { 
      Cart.findOne({'bookId':req.body.id}, function(err, result){
          if(result.length){
              result.buyer = result.buyer || req.user.fullName;
              result.bookId = result.bookId || req.body.id;
              result.bookTitle = result.bookTitle || req.body.title;
              result.quntity = 2; 
              result.total = result.total + price;
              result.save(function(err){
                  loadShoppingCart(res);
              });
          }else{
              var newCart = new Cart({
              buyer: req.user.fullName,
              bookId: req.body.id,
              bookTitle: req.body.title,
              quantity: 1, 
              total: req.body.price
          });
          Cart.addBook(newCart, function(err, cart){
              if(err){
                  res.send(err);
              }else{
                  loadShoppingCart(res);
              }
          });
          }
       }); 
       
        
  },
  remove(req, res){
      Cart.remove(function(err){
          if(err) throw err
         
          loadShoppingCart(res);
      })
  }
};