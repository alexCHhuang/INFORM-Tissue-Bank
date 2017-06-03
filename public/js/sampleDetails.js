
var temp = document.getElementById('diagnosisValue');
temp.innerHTML = uniqueSample[0].diagnosis;

var temp = document.getElementById('Allele1Value');
temp.innerHTML = uniqueSample[0].Allele1;

var temp = document.getElementById('proteinRelInfoValue');
temp.innerHTML = uniqueSample[0].proteinRelInfo;
var temp = document.getElementById('proteinCodeValue');
temp.innerHTML = uniqueSample[0].proteinCode;
var temp = document.getElementById('DNARelInfoValue');
temp.innerHTML = uniqueSample[0].DNARelInfo;
var temp = document.getElementById('DNACodeValue');
temp.innerHTML = uniqueSample[0].DNACode;
var temp = document.getElementById('Allele2Value');
temp.innerHTML = uniqueSample[0].Allele2;
var temp = document.getElementById('proteinRelInfoValue2');
temp.innerHTML = uniqueSample[0].proteinRelInfo2;
temp = document.getElementById('proteinCodeValue2');
temp.innerHTML = uniqueSample[0].proteinCode2;
var temp = document.getElementById('DNARelInfoValue2');
temp.innerHTML = uniqueSample[0].DNARelInfo2;
var temp = document.getElementById('DNACodeValue2');
temp.innerHTML = uniqueSample[0].DNACode2;

temp = document.getElementById('phenotypeMultipleValue');
temp.innerHTML = uniqueSample[0].phenotypeMultiple;

var temp = document.getElementById('sampleDateValue');
temp.innerHTML = uniqueSample[0].sampleDate;

var temp = document.getElementById('subjectIDValue');
temp.innerHTML = uniqueSample[0].subjectID;

var temp = document.getElementById('ageValue');
temp.innerHTML = uniqueSample[0].age;

var temp = document.getElementById('sexValue');
temp.innerHTML = uniqueSample[0].sex;

var temp = document.getElementById('ethnicBackgroundValue');
temp.innerHTML = uniqueSample[0].ethnicBackground;

temp = document.getElementById('consentForFurtherResearchValue');
if (uniqueSample[0].consentForFurtherResearch != null){
  temp.innerHTML = uniqueSample[0].consentForFurtherResearch;
} else {
  temp.innerHTML = 'No'
}

<!-- Right Row Now -->
temp = document.getElementById('sampleValue');
temp.innerHTML = uniqueSample[0].sampleType;
temp = document.getElementById('cellSampleTypeValue');
temp.innerHTML = uniqueSample[0].cellSampleType;
temp = document.getElementById('passageNumberCellValue');
temp.innerHTML = uniqueSample[0].passageNumberCell;
temp = document.getElementById('ageAtSamplingCellValue');
temp.innerHTML = uniqueSample[0].ageAtSamplingCell;
temp = document.getElementById('priorBioCellValue');
temp.innerHTML = uniqueSample[0].priorBioCell;
temp = document.getElementById('ageAtSamplingBloodValue');
temp.innerHTML = uniqueSample[0].ageAtSamplingBlood;
temp = document.getElementById('nutritionBloodValue');
temp.innerHTML = uniqueSample[0].nutritionBlood;
temp = document.getElementById('healthBLoodValue');
temp.innerHTML = uniqueSample[0].healthBLood;
//temp = document.getElementById('nutritionBloodValue');
//temp.innerHTML = uniqueSample[0].sampleTypeBloodValue;
temp = document.getElementById('sampleTypeBloodValue');
temp.innerHTML = uniqueSample[0].sampleTypeBlood;
temp = document.getElementById('priorBioBloodValue');
temp.innerHTML = uniqueSample[0].priorBioBlood;
temp = document.getElementById('ageAtSamplingUrineValue');
temp.innerHTML = uniqueSample[0].ageAtSamplingUrine;
temp = document.getElementById('nutritionUrineValue');
temp.innerHTML = uniqueSample[0].nutritionUrine;
temp = document.getElementById('healthUrineValue');
temp.innerHTML = uniqueSample[0].healthUrine;
temp = document.getElementById('priorBioUrineValue');
temp.innerHTML = uniqueSample[0].priorBioUrine;
temp = document.getElementById('tissueTypeValue');
temp.innerHTML = uniqueSample[0].tissueType;
temp = document.getElementById('ageAtSamplingTissueValue');
temp.innerHTML = uniqueSample[0].ageAtSamplingTissue;
temp = document.getElementById('tissueStateValue');
temp.innerHTML = uniqueSample[0].tissueState;
temp = document.getElementById('priorPathTissueValue');
temp.innerHTML = uniqueSample[0].priorPathTissue;

<!-- To control display of Alleles-->
if (uniqueSample[0].Allele1 == 'Protein') {
  var x =document.getElementById('Allele1Protein');
  x.style.display = 'block';
}
if (uniqueSample[0].Allele1 == 'DNA') {
  var x =document.getElementById('Allele1DNA');
  x.style.display = 'block';
}

if (uniqueSample[0].Allele2 == 'Protein') {
  var x =document.getElementById('Allele2Protein');
  x.style.display = 'block';
}
if (uniqueSample[0].Allele2 == 'DNA') {
  var x =document.getElementById('Allele2DNA');
  x.style.display = 'block';
}
<!-- Control display of tissue type -->
if (uniqueSample[0].sampleType == 'Cell') {
  var x =document.getElementById('cellSampleDiv');
  x.style.display = 'block';
}
if (uniqueSample[0].sampleType == 'Blood') {
  var x =document.getElementById('bloodSampleDiv');
  x.style.display = 'block';
}
if (uniqueSample[0].sampleType == 'Urine') {
  var x =document.getElementById('urineSampleDiv');
  x.style.display = 'block';
}
if (uniqueSample[0].sampleType == 'Tissue') {
  var x =document.getElementById('tissueSampleDiv');
  x.style.display = 'block';
}
<!-- Right Row Ends -->
