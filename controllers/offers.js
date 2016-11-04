const express = require('express');
const Book = require('../models/book');
const Offer = require('../models/offer');
const router = express.Router();

module.exports = {
	index(req, res){
        Offer.find()
        .then(function(err, book){
            if(err){
                res.status(500).json(err);
            }else{
                res.status(200).json(book);
            }
        });
    },
    newOffer(req, res){
        var offerMsg = req.body.offerMsg;
        var book_id = req.body.book_id;
        var date = new Date();
        var time = date.getTime();

        console.log(offerMsg);

        if(offerMsg == undefined || offerMsg == null) {
            req.flash('success_msg', offerMsg);
            res.redirect('/user/dashboard');
        }
        
        var newOffer = new Offer({
            user: req.user.email,
            book_id: book_id,
            message: offerMsg,
            date: time
        });

        Offer.saveNewOffer(newOffer, function(err, offer) {
        	    if(err) throw err;
    			req.flash('success_msg', 'Your Offer has been sent');
    			res.redirect('/user/dashboard');
        });
    }
};
