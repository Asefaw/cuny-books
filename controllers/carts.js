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

var book_title, owner, price; //holds book properties
module.exports = {
    
    index(req, res){
        if(req.user){
            loadShoppingCart(res);
        }else{
            res.redirect('user/login');
        }
    },
    
  add(req, res) { 
      //get book properies which is added to the sopping cart
     Book.findById(req.params.book_id, function(err, doc){
         if(err)
            console.log(err);
            book_title = doc.title;
            owner = doc.owner;
            price = doc.price; 
     });
     var qty = 1; 
    
    // if the book exist in the shopping cart increase quantity
    Cart.findById(req.params.book_id, function(err, book){
        if(book){
            book.qunatity += 1;
            book.save();
        }else{
            Cart.addBook( new Cart({
                 buyer: owner,
                 bookId: req.params.book_id,
                 bookTitle: book_title, 
                 quantity: 1,
                 total: qty * price
         }), function(err, cart){
                if(err) throw err;
                req.flash('success_msg', 'Book Added to your cart')
                loadShoppingCart(res);
            });
             
        }
    }); 
  }  
};