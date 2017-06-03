var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var Sample = require('../models/sample');

router.post('/createSample', function(req, res){
	var subjectID = req.body.subjectID;
  console.log(subjectID);


	var newSample = new Sample({
		subjectID: subjectID
	});

	Sample.createSample(newSample, function(err, sample){
		if(err) throw err;
		console.log(sample);
	});

	req.flash('success_msg', 'You are created a new sample successfully');

	res.redirect('/users/addSample');
});
