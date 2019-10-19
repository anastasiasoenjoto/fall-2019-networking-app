  
const router = require('express').Router();
let Company = require('../models/company.model');

router.route('/').get((req, res) => {
  Company.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const companyName = req.body.companyName;
  const email = req.body.email;
  const password = req.body.password;
  const city = req.body.city;
  const field = req.body.field;


  const newCompany = new Company({username, companyName, email, password, city, field});

  newCompany.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
  console.log("success!")

  });

module.exports = router;