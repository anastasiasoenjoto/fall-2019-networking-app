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

    module.exports = router;