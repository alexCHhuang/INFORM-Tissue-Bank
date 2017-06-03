var mongoose = require('mongoose');


var SampleSchema = mongoose.Schema({
	sampleid: {
		type: String,
		index:true
	},
	sampleType: {
		type: String,
	},
	diagnosis: {
		type: String
	},
	Allele1: {
		type: String
	},
	proteinRelInfo: {
		type: String
	},
  proteinCode: {
    type: String
  },
  DNARelInfo: {
    type: String
  },
  DNACode: {
    type: String
  },
  Allele2: {
    type: String
  },
  proteinRelInfo2: {
    type: String
  },
  proteinCode2: {
    type: String
  },
  DNARelInfo2: {
    type: String
  },
  DNACode2: {
    type: String
  },
  phenotypeMultiple: {
    type: [String]
  },
  sampleDate: {
    type: String
  },
  subjectID: {
    type: String
  },
  age: {
    type: String
  },
  sex: {
    type: String
  },
  ethnicBackground: {
    type: String
  },
  tabSelected: {
    type: String
  },
  cellSampleType: {
    type: String
  },
  passageNumberCell: {
    type: String
  },
  ageAtSamplingCell: {
    type: String
  },
  priorBioCell: {
    type: String
  },
  ageAtSamplingBlood: {
    type: String
  },
  nutritionBlood: {
    type: String
  },
  healthBLood: {
    type: String
  },
  sampleTypeBlood: {
    type: String
  },
  priorBioBlood: {
    type: String
  },
  ageAtSamplingUrine: {
    type: String
  },
  nutritionUrine: {
    type: String
  },
  healthUrine: {
    type: String
  },
  priorBioUrine: {
    type: String
  },
  tissueType: {
    type: String
  },
  ageAtSamplingTissue: {
    type: String
  },
  tissueState: {
    type: String
  },
  priorPathTissue: {
    type: String
  },
	consentForFurtherResearch: {
		type: String
	},
	icon:{
		type:String
	},
	user: {
		type: String
	}
});

var Sample = module.exports = mongoose.model('Sample', SampleSchema);

module.exports.createSample = function(newSample, callback){
	newSample.save(callback);
}
module.exports.updateSample = function(newSample, callback){
	Sample.findOneAndUpdate({_id:newSample.repassedID},newSample,{new:true},callback);
}

// module.exports.deleteSample = function(id){
// 	Sample.findOneAndRemove({_id:id},function(err,removed){
// 	});
// }
