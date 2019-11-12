  
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
  const city = req.body.city;


  const newCompany = new Company({companyName, username, email, password, city });

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


module.exports = router;