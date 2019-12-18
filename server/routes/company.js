  
const router = require('express').Router();
let Company = require('../models/company.model');

router.route('/').get((req, res) => {
  Company.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const companyName = req.body.companyName;
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const jobs = [];
  var city = req.body.city;
  const about = req.body.about; 
  const employeecount = req.body.employeeCount


  city = city.toLowerCase();
  city = city.replace(/\s/g,'');

  const newCompany = new Company({companyName, username, email, password, city, jobs, about, employeecount });

  newCompany.save()
    .then(() => res.json(
      {
        companyName,
        username,
        email,
        password,
        city
      }
    ))
    .catch(err => res.status(400).json('Error: ' + err));
  console.log(companyName,
    username,
    email,
    password,
    city)
  });

  router.post('/validateCompany', (req, res) => {
    var username = req.body.username;
    var password = req.body.password;

    Company.findOne({username: username, password: password}, function(err, user){
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
        res.json({"message": message, "username": username, "password": password});
    })

});

router.post('/getCurrentCompany', (req, res) => {
  var username = req.body.username;


  Company.findOne({username: username}, function(err, user){
      if(err) {
          console.log(err);
      }
      var message;
      if(user) {
          console.log(user)
          message = 'found User!';
          console.log(message)
          res.json({"user": Array(user)});
      }

      else {
        message = 'not found!';
        res.json({"user": []});
      }



  })

});

router.post('/editProfile', async (req, res) => {
  var username = req.body.username
  var city = req.body.city
  city = city.toLowerCase()
  city = city.replace(/\s/g,'')
  const doc = await Company.findOne({username: username});
  doc.companyName = req.body.companyName
  doc.email = req.body.email;
  doc.password = req.body.password;
  doc.city = req.body.city;

  await doc.save();

});


router.post('/addJob', async (req, res) => {
  var username = req.body.companyUsername
  console.log("username: ", req.body.companyUsername)
  var jobId = req.body.jobId
  const doc = await Company.findOne({username: username});
  doc.jobs.push(jobId)
  await doc.save();
  res.json({message: 'job added'})
});







module.exports = router;