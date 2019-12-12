const router = require('express').Router();
let Job = require('../models/job.model');
const {ObjectId} = require('mongodb'); 

router.route('/').get((req, res) => {
  Job.find()
    .then(jobs => res.json(jobs))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const companyUsername = req.body.companyUsername;
    var jobTitle = req.body.jobTitle;
    const numOfPositions = req.body.numOfPositions;
    const jobDescription = req.body.jobDescription;
    var jobLocation = req.body.jobLocation;
    const jobSalary = req.body.jobSalary;
    const gpaReq = req.body.gpaReq;
    var majorReq = req.body.majorReq;
    const applicationDeadline = req.body.applicationDeadline;
    const applicants = []

    jobTitle = jobTitle.toLowerCase()
    jobTitle = jobTitle.replace(/\s/g,'')
    jobLocation = jobLocation.toLowerCase()
    jobLocation = jobLocation.replace(/\s/g,'')
    majorReq = majorReq.toLowerCase()
    majorReq = majorReq.replace(/\s/g,'')

    const newJob = new Job({companyUsername, jobTitle, numOfPositions, jobDescription, jobLocation, jobSalary, gpaReq, majorReq, applicationDeadline, applicants});
  
    newJob.save()
      .then(() => res.json('Job added!'))
      .catch(err => res.status(400).json('Error: ' + err));
    console.log("success!")
  
    });

router.post('/getRecommendedJobs', (req, res) => {
  var city = req.body.city;
  city = city.toLowerCase()
  city = city.replace(/\s/g,'')

  Job.find({jobLocation: city}, function(err, job){
      if(err) {
          console.log(err);
      }
      var message;
      if(job) {
          message = 'found Job!';
          console.log(message)
      }

      else {
        message = 'not found!';
      }
      res.json({"jobs": Array(job), message: message})
  })
});

router.post('/queryJobs', (req, res) => {
  var nameOfOpenPosition = req.body.nameOfOpenPosition;
  var GPA = req.body.GPA;
  var city = req.body.city;
  city = city.toLowerCase()
  city = city.replace(/\s/g,'')
  console.log('message received')

  Job.find({nameOfOpenPosition: nameOfOpenPosition, gpaRequirement: {$gt :GPA}, jobLocation: city}, function(err, jobs){
      if(err) {
          console.log(err);
      }
      var message; 
      if(jobs) {
          console.log(jobs)
          message = 'valid';
          console.log(message)
      } else {
          message = 'invalid';
          console.log(message)
      }

      res.json({"message": message, "jobs" : jobs});
  })

});

router.post('/addApplicants', async (req, res) => {
    var jobId = req.body.jobId;
    skills_string = req.body.skill
    var skills_array = skills_string.split(',')
    for (i=0; i<skills_array.length; i++) {
      skills_array[i] = skills_array[i].toLowerCase();
      skills_array[i] = skills_array[i].replace(/\s/g,'')
    }
    
    const applicantDetails = {
      name: req.body.nameOfApplicant, 
      email: req.body.email,
      major: req.body.major, 
      GPA: req.body.GPA, 
      skills: skills_array
    }

    // const doc = await Job.findOne({_id: ObjectId('5de97ec89cb4c2836ccf5bc1')});
    const doc = await Job.findOne({_id: ObjectId(jobId)});
    doc.applicants.push(applicantDetails)
    await doc.save();
    res.json({"message": "applicant added"})
    
});


module.exports = router;



