var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');
var Sample = require('../models/sample');

var nodemailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');
var async = require('async');
var bcrypt = require('bcryptjs');

// index
router.get('/index', function(req, res){

	/* Find all users of type 'Investigator'
    and send the data from the users collection back to
    client-side to populate the table in the home page. */

    User.find({Type: "Investigator"}, function(err, docs) {
         if (!err) {
             // console.log(docs);
             res.render('index', {invData: JSON.stringify(docs)});
         } else {
             console.log(err);
         }
    });

});

// About
router.get('/about', function(req, res){
	res.render('about');
});

// Auth
router.get('/auth', function(req, res){
	res.render('auth');
});



/*
  Here we are configuring our SMTP Server details.
  STMP is mail server which is responsible for sending and recieving email.
*/

var transport = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    auth: {
        user: 'cmuinformcapstone@gmail.com', // my mail
        pass: 'sldkfjgh77'	// my password
    }
}));

// Activate User
router.get('/activate', function(req, res){
  async.waterfall([
      function(done) {
        var userId = req.query.userid;
        User.activateUserByUserId(userId, function(err, user){
          if (err) throw err;
          done(err, user);
        });
      },
      function(user, done) {
      var mailOptions = {
        to: user.Email,
        from: 'cmuinformcapstone@gmail.com',
        subject: 'Your account has been activated',
        text: 'Hello,\n\n' +
          'This is a confirmation that the your account ' + user.Email + ' has just been activated.\n'
      };
      transport.sendMail(mailOptions, function(err) {
        req.flash('success_msg', 'Success! Your account has been activated.');
        done(err);
      });
    }
  ]);
  res.end("the user has been activated");
});

// forgot password
router.get('/forgot', function(req, res) {
  res.render('forgot', {
    user: req.user
  });
});

router.post('/forgot', function(req, res) {
  async.waterfall([
    function(done) {
      User.getUserByEmail(req.body.email, function(err, user) {
        if (!user) {
          req.flash('error', 'No account with that email address exists.');
          return res.redirect('/forgot');
        }
        done(err, user);
      });
    },
    function(user, done) {
      var mailOptions = {
        to: user.Email,
        from: 'cmuinformcapstone@gmail.com',
        subject: 'User Password Reset',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' + req.headers.host + '/users/reset/' + user.id + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };
      transport.sendMail(mailOptions, function(err) {
        req.flash('success_msg', 'An e-mail has been sent to ' + user.Email + ' with further instructions.');
        done(err, 'done');
      });
    }
  ], function(err) {
    if (err)  return;
        res.redirect('/users/forgot');
  });
});

// reset password
router.get('/reset/:token', function(req, res) {
  User.findById(req.params.token, function(err, user) {
    if (!user) {
      req.flash('error', 'Password reset token is invalid');
      return res.redirect('/users/forgot');
    }
    res.render('reset', {
      user: req.user
    });
  });
});

router.post('/reset/:token', function(req, res) {
  async.waterfall([
    function(done) {
      User.findById(req.params.token, function(err, user) {
        if (!user) {
          req.flash('error_msg', 'Password reset token is invalid.');
          return res.redirect('back');
        }
        var newpassword = req.body.password;
        bcrypt.genSalt(10, function(err, salt) {
          bcrypt.hash(newpassword, salt, function(err, hash) {
              user.password = hash;
              user.save(function(err) {
              done(err, user);
            });
          });
        });
      });
    },
    function(user, done) {
      var mailOptions = {
        to: user.Email,
        from: 'cmuinformcapstone@gmail.com',
        subject: 'Your password has been changed',
        text: 'Hello,\n\n' +
          'This is a confirmation that the password for your account ' + user.Email + ' has just been changed.\n'
      };
      transport.sendMail(mailOptions, function(err) {
        req.flash('success_msg', 'Success! Your password has been changed.');
        done(err);
      });
    }
  ], function(err) {
    res.redirect('/users/auth');
  });
});

// Register User
router.post('/register', function(req, res){
	var firstname = req.body.firstname;
	var lastname = req.body.lastname;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;
	var affiliation = req.body.affiliation;
	var bio = req.body.bio;
	var researchinterest = req.body.researchinterest;
    var title = req.body.title;
	var address1 = req.body.address1;
	var address2 = req.body.address2;
	var address3 = req.body.address3;
    var userType = req.body.userType;
    var country = req.body.country;

	// Validation
    req.checkBody('firstname', 'First Name is required').notEmpty();
	req.checkBody('lastname', 'Last Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();    
	req.checkBody('password', '6 to 20 characters password required').len(6, 20);
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
	req.checkBody('affiliation', 'Affiliation is required').notEmpty();
	req.checkBody('bio', 'Bio is required').notEmpty();
	req.checkBody('researchinterest', 'Research Interest is required').notEmpty();
    req.checkBody('title', 'Title is required').notEmpty();
	req.checkBody('address1', 'First line of Address is required').notEmpty();
	req.checkBody('userType', 'Type of User is required').notEmpty();
	req.checkBody('country', 'Country is required').notEmpty();

	var errors = req.validationErrors();

	if(errors){
		res.render('auth',{
			errors:errors
		});
	} else {
		async.waterfall([
			function(done) {
				// check if user already exists
				User.getUserByUsername(username, function(err, user){
					if (err) throw err;
					//existing user found, stop registration
					if (user) {
						req.flash('signup_error_msg', "That user already exists");
						res.redirect('/users/auth');
						return;
					}
					var newUser = new User({
						FirstName: firstname,
			            LastName: lastname,
						Email:email,
						username: username,
						password: password,
		                Title: title,
		                Institution: affiliation,
		                Bio: bio,
		                Address1: address1,
		                Address2: address2,
		                Address3: address3,
		                Country: country,
		                Type: userType
					});

					User.createUser(newUser, function(err, user){
						done(err, user);
					});
					req.flash('success_msg', "Please wait for Keith's approval");

					res.redirect('/users/auth');
				});
			},
			function(user, done) {
				// send email to Keith
				var activate_link = "https://informvtb.herokuapp.com/users/activate?userid="+user.id;
				var mailOptions={
				    from: "cmuinformcapstone@gmail.com", // sender address
				    to: "keith.mcintire@chp.edu", // send to Keith for approval
				    subject: "Please confirm this registration request", // Subject line
				    html: "Hello Keith,<br> Please Click on the link\
				     to verify the user's registration request. <br><br>\
				     Username: " + firstname + " " + lastname + "<br>\
				     Email: " + email + "<br>\
				     Title: " + title + "<br>\
				     Institution: " + affiliation + "<br>\
				     Bio: " + bio + "<br>\
				     Country: " + country + "<br>\
				     Type: " + userType + "<br><br>\
				     <a href="+activate_link+">Click here to verify</a>"
				}
				  transport.sendMail(mailOptions, function(error, response){
				     if(error){
				          console.log(error);
				    res.end("error");
				   }else{
				    	console.log("Message sent: " + response.message);
				    res.end("sent");
			       }
				});
			}
		]);
	}
});

passport.use(new LocalStrategy(
  function(username, password, done) {
   User.getUserByUsername(username, function(err, user){
   	if(err) throw err;
   	if(!user){
   		return done(null, false, {message: 'Unknown User'});
   	}
   	var auth = user.toObject().auth;
   	if(auth != true){
   		return done(null, false, {message: 'Unauthorized User'});
   	}

   	User.comparePassword(password, user.password, function(err, isMatch){
   		if(err) throw err;
   		if(isMatch){
   			return done(null, user);
   		} else {
   			return done(null, false, {message: 'Invalid password'});
   		}
   	});
   });
  }));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

router.post('/login',
  passport.authenticate('local', {failureRedirect:'/users/auth',failureFlash: true}),
  function(req, res) {
  	res.redirect('/sample/search');
  });

router.get('/logout', function(req, res){
	req.logout();

	req.flash('success_msg', 'You are logged out');

	res.redirect('/users/index');
});

module.exports = router;
