const router = require('express').Router();
let Job = require('../models/job.model');

router.route('/').get((req, res) => {
  Job.find()
    .then(jobs => res.json(jobs))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const nameOfOpenPosition = req.body.nameOfOpenPosition;
  const numOfOpenPositions = req.body.numOfOpenPositions;
  const jobDescription = req.body.jobDescription;
  const gpaRequirement = req.body.gpaRequirement;
  const workExperienceRequirement = req.body.workExperienceRequirement;
  const workLocation = req.body.workLocation;
  const estimatedSalaryPerHour = req.body.estimatedSalaryPerHour;
  const applicationDeadline = req.body.applicationDeadline;

  const newJob = new Job({nameOfOpenPosition, numOfOpenPositions, jobDescription, 
    gpaRequirement, workExperienceRequirement, workLocation, estimatedSalaryPerHour,
    applicationDeadline });

  newJob.save()
    .then(() => res.json(
      {
        nameOfOpenPosition,
        numOfOpenPositions,
        jobDescription,
        gpaRequirement,
        workExperienceRequirement,
        workLocation,
        estimatedSalaryPerHour,
        applicationDeadline
      }
    
  ))
  .catch(err => res.status(400).json('Error: ' + err));
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