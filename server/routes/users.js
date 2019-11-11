const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  const city = req.body.city;
  const major = req.body.major;
  const GPA = req.body.GPA;


  const newUser = new User({username, firstName, lastName, email, password, city, major, GPA});

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
  console.log("success!")

  });

  router.post('/validateUser', (req, res) => {
      var username = req.body.username;
      var password = req.body.password;
      
      User.findOne({username: username, password: password}, function(err, user){
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