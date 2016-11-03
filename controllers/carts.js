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
    //   Cart.findOne({'id':req.params.book_id}, function(err, result){
    //       if(err){
    //           console.log(err);
    //       }else{
    //           book_title = result.title;
    //           price = result.price;
    //       }
    //   }); 
       
       var newCart = new Cart({
           buyer: req.user.fullName,
           bookId: req.body.id,
           bookTitle: req.body.title,
           quantity: 1,
           price:  req.body.price,
           total: req.body.price
       });
       Cart.addBook(newCart, function(err, cart){
           if(err){
               res.send(err);
           }else{
               loadShoppingCart(res);
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