  
const router = require('express').Router();
let User = require('../models/userLogin.model');

// router.route('/').get((req, res) => {
//   User.find({username: 'izzy'})
//       .then(users => console.log("USER FOUND"))
//     // .then(users => res.json(users))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

router.route('/').get((req, res) => {
    User.find()
      .then(users => res.json(users))
      .catch(err => res.status(400).json('Error: ' + err));
  });

router.route('/validateUser').get((req, res) => {
    console.log("validate success");
    // User.findOne({username: 'izzy'}, function(err, user){
    //     if(err) {
    //         console.log(err);
    //     }
    //     var message; 
    //     if(user) {
    //         console.log(user)
    //         message = 'user exists';
    //         console.log(message)
    //     } else {
    //         message = 'user doesnt exist';
    //         console.log(message)
    //     }
    //     res.json({message: message});

    // })
    
//   const username = req.body.username;
//   const firstName = req.body.firstName;
//   const lastName = req.body.lastName;
//   const email = req.body.email;
//   const password = req.body.password;
//   const city = req.body.city;
//   const major = req.body.major;
//   const GPA = req.body.GPA;


//   const newUser = new User({username, firstName, lastName, email, password, city, major, GPA});

//   newUser.save()
//     .then(() => res.json('User added!'))
//     .catch(err => res.status(400).json('Error: ' + err));
//   console.log("success!")

  });

module.exports = router;