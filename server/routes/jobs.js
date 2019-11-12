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


module.exports = router;