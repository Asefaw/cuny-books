const express = require('express');
const Book = require('../models/book');
const User = require('../models/user');
const Cart = require('../models/cart');

function loadShoppingCart(req, res){
    Cart.find(function(err, cart){ 
        if(err)
            res.render('carts', {'error_msg': 'Error loading your cart'});

        var grandTotal = 0;
        var totalBooks = 0;
        for(var i=0; i< cart.length; i++){ 
          grandTotal += cart[i].total;
          totalBooks++;
        }
        req.session.totalBooks = totalBooks;
        req.session.totalAmount = grandTotal;
        res.render('carts', {cart: cart, total: grandTotal, totalBooks: totalBooks});
    });
};

var book_title, buyer, price; //holds book properties
module.exports = {
    
    index(req, res){
        if(req.user){
            loadShoppingCart(req,res);
        }else{
            res.redirect('user/login');
        }
    },
    
  add(req, res) { 
      Cart.findOne({'bookId':req.body.id}, function(err, result){
          
          if(result){ 
              result.buyer = result.buyer || req.user.fullName;
              result.bookId = result.bookId || req.body.id;
              result.bookTitle = result.bookTitle || req.body.title;
              result.quantity++; 
              result.total = result.total + parseInt(req.body.price);
              result.save(function(err){ 
                  loadShoppingCart(req,res);
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
                  loadShoppingCart(req,res);
              }
          });
          }
      }); 
       
        
  },
  remove(req, res){
    Cart.findByIdAndRemove(req.params.id,function(err){
      if(err) throw err
     
      loadShoppingCart(req,res);
    });
  },
  emptyCart(req, res){
    Cart.remove(function(err){
      if(err) throw err
     
      loadShoppingCart(req,res);
    });  
  }
};