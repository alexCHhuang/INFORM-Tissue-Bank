var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var Sample = require('../models/sample');
var User = require('../models/user');

var nodemailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');

router.get('/mybank', function(req, res){
  if(req.user.username != null){
    Sample.find({user:req.user.username}, function(err, docs) {
         if (!err) {
            //	console.log(JSON.stringify(docs));
             res.render('mybank', {invData: JSON.stringify(docs)});
         } else {
             console.log(err);
         }
    }).sort({_id:-1});
  }

});

// Add Samplero
router.get('/addSample', function(req, res){
	res.render('addSample');
});

// Edit Sample
router.get('/editSample', function(req, res){
//	console.log('edit'+req.query.id);
  Sample.find({_id:req.query.id}, function(err, docs) {
      if (!err) {
          res.render('editSample', {invData: JSON.stringify(docs)});
      } else {
          console.log(err);
      }
 });
});

// To view the sampleDate
router.get('/sampledetails', function(req, res){
//	console.log('edit'+req.query.id);
  Sample.find({_id:req.query.id}, function(err, docs) {
      if (!err) {
          res.render('sampledetails', {invData: JSON.stringify(docs)});
      } else {
          console.log(err);
      }
 });
});

router.post('/deleteSample', function(req, res){
	//Sample.deleteSample(req.body.id);
	Sample.remove({_id:req.body.id},function(err,removed){
		if (!err) {
      console.log("Inside successful Deletion")
				res.redirect('/mybank');
				//res.redirect(req.get('referer'));
		} else {
				console.log(err);
		}
	});
	//req.flash('success_msg', 'Sample Deleted');
	//res.redirect('/myBank');
});

router.post('/updateSample', function(req, res){
	//console.log(req)
	var sampleid = req.body.sampleid;
	var sampleType=req.body.sampleType;
	var diagnosis = req.body.diagnosis;
	var Allele1 = req.body.Allele1;
	var proteinRelInfo = req.body.proteinRelInfo;
	var proteinCode = req.body.proteinCode;
	var DNARelInfo = req.body.DNARelInfo;
	var DNACode = req.body.DNACode;
	var proteinCode2 = req.body.proteinCode2;
	var Allele2 = req.body.Allele2;
	var proteinRelInfo2 = req.body.proteinRelInfo2;
	var proteinCode2 = req.body.proteinCode2;
	var DNARelInfo2 = req.body.DNARelInfo2;
	var DNACode2 = req.body.DNACode2;
	var phenotypeMultiple = req.body.phenotypeMultiple;
	var sampleDate = req.body.sampleDate;
	var subjectID = req.body.subjectID;
	var age = req.body.age;
	var sex = req.body.sex;
	var tabSelected = req.body.tabSelected;
	var cellSampleType = req.body.cellSampleType;
	var passageNumberCell = req.body.passageNumberCell;
	var ageAtSamplingCell = req.body.ageAtSamplingCell;

	var priorBioCell = req.body.priorBioCell;
	var ageAtSamplingBlood = req.body.ageAtSamplingBlood;
	var nutritionBlood = req.body.nutritionBlood;
	var healthBLood = req.body.healthBLood;
	var sampleTypeBlood = req.body.sampleTypeBlood;
	var priorBioBlood = req.body.priorBioBlood;
	var ageAtSamplingUrine = req.body.ageAtSamplingUrine;
	var nutritionUrine = req.body.nutritionUrine;
	var healthUrine = req.body.healthUrine;
	var priorBioUrine = req.body.priorBioUrine;
	var tissueType = req.body.tissueType;
	var ageAtSamplingTissue = req.body.ageAtSamplingTissue;
	var tissueState = req.body.tissueState;
	var priorPathTissue = req.body.priorPathTissue;
	var consentForFurtherResearch = req.body.consentForFurtherResearch;
	var ethnicBackground = req.body.ethnicBackground;;
	var repassedID = req.body._repassedID;
//	console.log("Body OD"+req.body._repassedID);
	var user = req.user.username;
  console.log("Inside Update JS"+req.body._repassedID);
	req.checkBody('diagnosis', 'diagnosis').notEmpty();
	req.checkBody('age', 'age of the sample is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
	req.checkBody('affiliation', 'Affiliation is required').notEmpty();
	req.checkBody('bio', 'Bio is required').notEmpty();
	req.checkBody('researchinterest', 'Research Interest is required').notEmpty();

	var errors = req.validationErrors();

	// TBD: Validation

	// var errors = req.validationErrors();

	var newSample = {
		sampleid: sampleid,
		sampleType:sampleType,
		diagnosis: diagnosis,
		Allele1: Allele1,
		proteinRelInfo: proteinRelInfo,
		proteinCode: proteinCode,
		DNARelInfo: DNARelInfo,
		DNACode: DNACode,
		proteinRelInfo2: proteinRelInfo2,
		proteinCode2: proteinCode2,
		Allele2: Allele2,
		DNACode: DNACode,
		proteinCode2: proteinCode2,
		DNARelInfo2: DNARelInfo2,
		subjectID: subjectID,
		DNACode2: DNACode2,
		phenotypeMultiple: phenotypeMultiple,
		sampleDate: sampleDate,
		subjectID: subjectID,
		age: age,
		sex: sex,
		tabSelected: tabSelected,
		cellSampleType: cellSampleType,
		passageNumberCell: passageNumberCell,
		ageAtSamplingCell:ageAtSamplingCell,
		priorBioCell:priorBioCell,
		ageAtSamplingBlood:ageAtSamplingBlood,
		nutritionBlood:nutritionBlood,
		healthBLood:healthBLood,
		sampleTypeBlood:sampleTypeBlood,
		priorBioBlood:priorBioBlood,
		ageAtSamplingUrine:ageAtSamplingUrine,
		nutritionUrine:nutritionUrine,
		healthUrine:healthUrine,
		priorBioUrine:priorBioUrine,
		tissueType:tissueType,
		ageAtSamplingTissue:ageAtSamplingTissue,
		tissueState:tissueState,
		priorPathTissue:priorPathTissue,
		consentForFurtherResearch:consentForFurtherResearch,
		ethnicBackground:ethnicBackground,
		user:user,
		repassedID:repassedID
	};


Sample.updateSample(newSample, function(err, sample){
		if(err) throw err;
	});

	req.flash('success_msg', 'You updated your sample successfully');

	res.redirect('/sample/myBank');
});
// Create Sample
router.post('/createSample', function(req, res){
	//console.log(req)
	var sampleid = req.body.sampleid;
	var sampleType=req.body.sampleType;
	var diagnosis = req.body.diagnosis;
	var Allele1 = req.body.Allele1;
	var proteinRelInfo = req.body.proteinRelInfo;
	var proteinCode = req.body.proteinCode;
	var DNARelInfo = req.body.DNARelInfo;
	var DNACode = req.body.DNACode;
	var proteinCode2 = req.body.proteinCode2;
	var Allele2 = req.body.Allele2;
	var proteinRelInfo2 = req.body.proteinRelInfo2;
	var proteinCode2 = req.body.proteinCode2;
	var DNARelInfo2 = req.body.DNARelInfo2;
	var DNACode2 = req.body.DNACode2;
	var phenotypeMultiple = req.body.phenotypeMultiple;
	var sampleDate = req.body.sampleDate;
	var subjectID = req.body.subjectID;
	var age = req.body.age;
	var sex = req.body.sex;
	var tabSelected = req.body.tabSelected;
	var cellSampleType = req.body.cellSampleType;
	var passageNumberCell = req.body.passageNumberCell;
	var ageAtSamplingCell = req.body.ageAtSamplingCell;

	var priorBioCell = req.body.priorBioCell;
	var ageAtSamplingBlood = req.body.ageAtSamplingBlood;
	var nutritionBlood = req.body.nutritionBlood;
	var healthBLood = req.body.healthBLood;
	var sampleTypeBlood = req.body.sampleTypeBlood;
	var priorBioBlood = req.body.priorBioBlood;
	var ageAtSamplingUrine = req.body.ageAtSamplingUrine;
	var nutritionUrine = req.body.nutritionUrine;
	var healthUrine = req.body.healthUrine;
	var priorBioUrine = req.body.priorBioUrine;
	var tissueType = req.body.tissueType;
	var ageAtSamplingTissue = req.body.ageAtSamplingTissue;
	var tissueState = req.body.tissueState;
	var priorPathTissue = req.body.priorPathTissue;
	var consentForFurtherResearch = req.body.consentForFurtherResearch;
	var ethnicBackground = req.body.ethnicBackground;
	var user = req.user.username;

	var newSample = new Sample({
		sampleid: sampleid,
		sampleType:sampleType,
		diagnosis: diagnosis,
		Allele1: Allele1,
		proteinRelInfo: proteinRelInfo,
		proteinCode: proteinCode,
		DNARelInfo: DNARelInfo,
		DNACode: DNACode,
		proteinRelInfo2: proteinRelInfo2,
		proteinCode2: proteinCode2,
		Allele2: Allele2,
		DNACode: DNACode,
		proteinCode2: proteinCode2,
		DNARelInfo2: DNARelInfo2,
		subjectID: subjectID,
		DNACode2: DNACode2,
		phenotypeMultiple: phenotypeMultiple,
		sampleDate: sampleDate,
		subjectID: subjectID,
		age: age,
		sex: sex,
		tabSelected: tabSelected,
		cellSampleType: cellSampleType,
		passageNumberCell: passageNumberCell,
		ageAtSamplingCell:ageAtSamplingCell,
		priorBioCell:priorBioCell,
		ageAtSamplingBlood:ageAtSamplingBlood,
		nutritionBlood:nutritionBlood,
		healthBLood:healthBLood,
		sampleTypeBlood:sampleTypeBlood,
		priorBioBlood:priorBioBlood,
		ageAtSamplingUrine:ageAtSamplingUrine,
		nutritionUrine:nutritionUrine,
		healthUrine:healthUrine,
		priorBioUrine:priorBioUrine,
		tissueType:tissueType,
		ageAtSamplingTissue:ageAtSamplingTissue,
		tissueState:tissueState,
		priorPathTissue:priorPathTissue,
		consentForFurtherResearch:consentForFurtherResearch,
		ethnicBackground:ethnicBackground,
		user:user
	});

	Sample.createSample(newSample, function(err, sample){
		if(err) throw err;
//		console.log(sample);
	});

	req.flash('success_msg', 'You are created a new sample successfully');

	res.redirect('/sample/mybank');
});

router.get('/searchSample', function(req, res){
	res.render('search');
});

router.get('/search', function(req, res){

	/* Find all sample data
    and send the data from the sample collection back to
    client-side to populate the table in the search page. */

    Sample.find({}, function(err, docs) {
         if (!err) {
            //  console.log(docs);
             res.render('search', {sampleData: JSON.stringify(docs)});
         } else {
             console.log(err);
         }
    });

});

router.post('/advancedSearchSample', function(req, res){

    var search_diagnosis = req.body.search_diagnosis;
    var search_phenotype = req.body.search_phenotype;
    var search_investigator = req.body.search_investigator;
    var search_type = req.body.search_type;
    if (search_phenotype==undefined)
        search_phenotype="";
    if (!(search_phenotype instanceof Array)) {
        search_phenotype = search_phenotype.split();
    }

    var query = {
                $or: [
                    {"user": search_investigator},
                    {"diagnosis": search_diagnosis},
                    {"sampleType": search_type},
                    {"phenotypeMultiple": { "$in" : search_phenotype}}
                ]
              };

    Sample.find(query, function(err, docs){
            if(!err) {
                console.log("Found samples with query - ");
                console.log(docs);
                res.render('search', {sampleData: JSON.stringify(docs)});
            } else {
             console.log(err);
         }
        });
});


module.exports = router;
