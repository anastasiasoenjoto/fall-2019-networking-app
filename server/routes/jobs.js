const router = require('express').Router();
let Job = require('../models/job.model');

router.route('/').get((req, res) => {
  Job.find()
    .then(jobs => res.json(jobs))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const companyUsername = req.body.companyUsername;
    const jobTitle = req.body.jobTitle;
    const numOfPositions = req.body.numOfPositions;
    const jobDescription = req.body.jobDescription;
    const jobLocation = req.body.jobLocation;
    const jobSalary = req.body.jobSalary;
    const gpaReq = req.body.gpaReq;
    const majorReq = req.body.majorReq;
    const applicationDeadline = req.body.applicationDeadline;
  
  
    const newJob = new Job({companyUsername, jobTitle, numOfPositions, jobDescription, jobLocation, jobSalary, gpaReq, majorReq, applicationDeadline});
  
    newJob.save()
      .then(() => res.json('Job added!'))
      .catch(err => res.status(400).json('Error: ' + err));
    console.log("success!")
  
    });

router.post('/getRecommendedJobs', (req, res) => {
  // var major = req.body.major;
  var city = req.body.city;


  Job.find({city: city}, function(err, job){
      if(err) {
          console.log(err);
      }
      var message;
      if(job) {
          // console.log(user)
          message = 'found Job!';
          console.log(message)
          // res.json({"user": Array(user)});
      }

      else {
        message = 'not found!';
        // res.json({"user": []});
      }
      res.json({"jobs": Array(job), message: message})
  })
});


router.post('/queryJobs', (req, res) => {
  var nameOfOpenPosition = req.body.nameOfOpenPosition;
  var GPA = req.body.GPA;
  var city = req.body.city;
  console.log('message received')

  User.find({nameOfOpenPosition: nameOfOpenPosition, gpaRequirement: {$gt :GPA}, workLocation: city}, function(err, jobs){
      if(err) {
          console.log(err);
      }
      var message; 
      if(user) {
          console.log(user)
          message = 'valid';
          console.log(message)
      } else {
          message = 'invalid';
          console.log(message)
      }

      res.json({"message": message, "jobs" : jobs});
  })

});


module.exports = router;

