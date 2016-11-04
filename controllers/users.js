const User = require('../models/user');
const sendGrid = require('sendgrid')('SENDGRID_APIKEY');
module.exports = {
    index(req, res){
        if(!req.user){
            var majors = require('../database/majors.js');
            res.render('signup', {majors: majors});
        }else{
            res.redirect('/user/dashboard');
        }
    },
    create(req, res){
        var fullName = req.body.fullName;
		var email = req.body.email; 
		var password = req.body.password; 
		var college = req.body.college;
	    var major = req.body.major;
		// Validation
		req.checkBody('fullName', 'Full Name is required').notEmpty();
		req.checkBody('email', 'Email is required').notEmpty();
		req.checkBody('email', 'Email is not valid').isEmail(); 
		req.checkBody('password', 'Password is required').notEmpty(); 
		req.checkBody('college', 'College is required').notEmpty(); 
		req.checkBody('terms', 'Must Agree With Terms').notEmpty(); 
	
		var errors = req.validationErrors();
		if(errors){
			res.render('signup',{
				errors: errors
			});
		}else{
			 var newUser = new User({
			 	fullName: fullName,
			 	email: email, 
			 	password: password,
			 	college: college,
                major: major
			 });
	
			 User.find({'email':email},function(err, emailExist){
			 	if(!emailExist.length){	 	
					User.createUser(newUser, function(err, user){
					 	if(err){
					 		throw err;
					 	}else{
                            var Email = new sendGrid.Email(); 
                                Email.addto(email),
                                Email.sentFrom('noreply@cunybooks.com'),
                                Email.setSubject('Confirmation Account has been Created!'),
                                Email.setHtml('Hello Your Account has been suuccessfully Created!)'
                            sendGrid.sen(Email);
					 		res.render('login',{status: {title: 'Account Created', msg: 'Login in using the email and password you just created.'}}); 
					 	}
					});
			 	}else{
			 		res.render('signup', {status: {msg: 'A User with Email: '+email + ' Already Exsit'}});
			 	}
			});
		}
    },
    showAll(req, res){
    	User.find()
    	.then(function(userList){
            res.status(200).json(userList);
    		//res.render('users', {users: userList});
    	})
    	.catch(function(err){
    		res.status(500).json(err);
    	});
    },
    show(req, res){
        User.findById(req.params.id, function(err, user){
            if(err){
                res.json(err);
            }else{
                res.json(user);
            }
        });
    },
    update(req, res){
    	User.find({'email': req.params.email}, function(err, updatedUser){
    		if(err) throw err;
    		res.status(200).json(updatedUser);
    	})
    },
    delete(req, res){
    	User.remove({'email': req.params.email}, function(err, deletedUser) {
    	    if(err){
    	    	res.status(500).json(err);
    	    }else{
    	    	res.status(200).json(deletedUser);
    	    }
    	});
    }
};