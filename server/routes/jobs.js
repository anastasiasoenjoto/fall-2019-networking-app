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
      .then(() => res.json({message:'Job added!', jobId:newJob._id}))
      .then(() => console.log("ID:",newJob._id))
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
  var GPA = req.body.gpaRequirement;
  var city = req.body.workLocation;
  city2 = city.toLowerCase();
  city2 = city2.replace(/\s/g,'');
  console.log(nameOfOpenPosition, GPA, city, city2)
  console.log('message received')

  Job.find({jobTitle: nameOfOpenPosition, gpaReq: {$gt :GPA}, jobLocation:{ $in : [city,city2]}}, function(err, jobs){
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
    console.log("JOB ID", jobId)
    skills_string = req.body.skill
    var skills_array = skills_string.split(',')
    for (i=0; i<skills_array.length; i++) {
      skills_array[i] = skills_array[i].toLowerCase();
      skills_array[i] = skills_array[i].replace(/\s/g,'')
    }
    
    const applicantDetails = {
      username: req.body.username,
      name: req.body.nameOfApplicant, 
      email: req.body.email,
      major: req.body.major, 
      GPA: req.body.GPA, 
      skills: skills_array, 
      resume: req.body.resume, 
      date: req.body.date,
      _id: req.body._id,
    }

    // const doc = await Job.findOne({_id: ObjectId('5de97ec89cb4c2836ccf5bc1')});
    const doc = await Job.findOne({_id: ObjectId(jobId)});
    doc.applicants.push(applicantDetails)
    await doc.save();
    res.json({"message": "applicant added"})
    
});

router.post('/analytics', async (req, res) => {
  var currentDate = new Date();
  var oneWeek = new Date();
  var username = req.body.username;
  var count = 0;
  oneWeek.setDate(currentDate.getDate() - 7);
  oneWeek = oneWeek.getTime()
  Job.find({})
    .then(jobs => {
      return jobs
    })
    .then(jobs => {
      jobs.forEach(job => {
        job.applicants.forEach(applicant => {
          
          if ((applicant.username == username) && ((new Date(applicant.date)).getTime()) >= oneWeek) {
                console.log("Applicant:", applicant.username)
                count = count + 1
            }
            
        })
      })
      return count
    })
    .then(count => {
      res.json({"count": count})
    })
});

router.post('/findAllApplicants', async (req,res) => {
  var jobs = req.body.jobs
  var applicants = {}
  Job.findOne({_id: ObjectId(jobs)}, function(err, job) {
    if (err) return handleError(err);
    applicants[job.jobTitle] = job.applicants
    return applicants
  })
  .then(applicants => {
    res.json({applicants: applicants})
  })
 
});


module.exports = router;



