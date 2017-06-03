var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// User Schema
var UserSchema = mongoose.Schema({
	username: {
		type: String,
		index: true,
		unique: true
	},
	auth: {
        type: Boolean, //by default is unauthenticated user
        default: false
    },
	password: {
		type: String
	},
	Email: {
		type: String
	},
    FirstName: {
		type: String
	},
	LastName: {
		type: String
	},
	Title: {
		type: String
	},
    Institution: {
		type: String
	},
	Bio: {
		type: String
	},
    Address1: {
		type: String
	},
    Address2: {
		type: String
	},
    Address3: {
		type: String
	},
	Country: {
		type: String
	},
    Type: {
		type: String
	}
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
}

module.exports.getUserByEmail = function(email, callback){
	var query = {Email: email};
	User.findOne(query, callback);
}

module.exports.getUserByUsername = function(username, callback){
	var query = {username: username};
	User.findOne(query, callback);
}
module.exports.activateUserByUserId = function(userid, callback){
	var update = {auth: true};
	User.findByIdAndUpdate(userid, update, callback);
}

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}
