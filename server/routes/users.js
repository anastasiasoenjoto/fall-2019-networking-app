  
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
  var city = req.body.city;
  var major = req.body.major;
  const GPA = req.body.GPA;
  const friends = [];

  city = city.toLowerCase();
  city = city.replace(/\s/g,'');
  major = major.toLowerCase();
  major = major.replace(/\s/g,'');

  const newUser = new User({username, firstName, lastName, email, password, city, major, GPA, friends});

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

router.post('/validateFriend', (req, res) => {
  var friendName = req.body.searchUsername;

  User.findOne(searchUsername), function(err, user){
    if(err){
      console.log(err);
    }
    var message;
    if(user){
      message = 'Request has been submitted';
      console.log(message)
    }
    else{
      message = 'Sorry, no such user exists';
      console.log(message)
    }
    res.json({'message': message, 'friendName': friendName});
  }
});


router.post('/getCurrentUser', (req, res) => {
  var username = req.body.username;
  
  User.findOne({username: username}, function(err, user){
      if(err) {
          console.log(err);
      }
      var message;
      if(user) {
          console.log(user)
          message = 'found User!';
          console.log(message)
      }

      else {
        message = 'not found!';
      }

      res.json({"message": message, "user": Array(user)})
  })

});

router.post('/queryUsers', (req, res) => {
  var username = req.body.username;
  var major = req.body.major;
  var GPA = req.body.GPA;
  var city = req.body.city;
  console.log(username, major, GPA, city)
  console.log('message received')

  major = major.toLowerCase();
  city = city.toLowerCase();
  major = major.replace(/\s/g,'');
  city = city.replace(/\s/g,'');
  if (username == ''){
    User.find({major: major, GPA: {$gt :GPA}, city: city}, function(err, user){
        if(err) {
            console.log(err);
        }
        var message; 
        if(user) {
          if (user = []){
            console.log(user)
            message = 'No Users Found';
            console.log(message)
          }
          else {
            console.log(user)
            message = 'valid';
            console.log(message)
          }
        } else {
            message = 'invalid';
            console.log(message)
        }

        res.json({"message": message, "users" : user});
    })
  }
  else if (major = ''){
    User.find({username : username, GPA: {$gt :GPA}, city: city}, function(err, user){
      if(err) {
          console.log(err);
      }
      var message; 
      if(user) {
        if (user = []){
          console.log(user)
          message = 'No Users Found';
          console.log(message)
        }
        else {
          console.log(user)
          message = 'valid';
          console.log(message)
        }
      } else {
          message = 'invalid';
          console.log(message)
      }

      res.json({"message": message, "users" : user});
  })
}
  else if (GPA = ''){
    User.find({username : username, major : major, city: city}, function(err, user){
      if(err) {
          console.log(err);
      }
      var message; 
      if(user) {
        if (user = []){
          console.log(user)
          message = 'No Users Found';
          console.log(message)
        }
        else {
          console.log(user)
          message = 'valid';
          console.log(message)
        }
      } else {
          message = 'invalid';
          console.log(message)
      } 

      res.json({"message": message, "users" : user});
    })
  }
  else if (city = ''){
    User.find({username : username, major : major,GPA: {$gt : GPA} }, function(err, user){
      if(err) {
          console.log(err);
      }
      var message; 
      if(user) {
        if (user = []){
          console.log(user)
          message = 'No Users Found';
          console.log(message)
        }
        else {
          console.log(user)
          message = 'valid';
          console.log(message)
        }
      } else {
          message = 'invalid';
          console.log(message)
      }

      res.json({"message": message, "users" : user});
    })
  }
  else {
    User.find({username : username, major: major, GPA: {$gt :GPA}, city: city}, function(err, user){
      if(err) {
          console.log(err);
      }
      var message; 
      if(user) {
        if (user = []){
          console.log(user)
          message = 'No Users Found';
          console.log(message)
        }
        else {
          console.log(user)
          message = 'valid';
          console.log(message)
        }
      }
      else {
          message = 'invalid';
          console.log(message)
      }

      res.json({"message": message, "users" : user});
  })
}

});



router.post('/getRecommendedUser', (req, res) => {
  var major = req.body.major;
  var city = req.body.city;

  major = major.toLowerCase();
  city = city.toLowerCase();
  major = major.replace(/\s/g,'');
  city = city.replace(/\s/g,'');

  User.find({major: major, city: city}, function(err, user){
      if(err) {
          console.log(err);
      }
      var message;
      if(user) {
          console.log(user)
          message = 'found User!';
          console.log(message)
          // res.json({"user": Array(user)});
      }

      else {
        message = 'not found!';
        // res.json({"user": []});
      }
      res.json({"users": Array(user), message: message})
  })
});

router.post('/editProfile', async (req, res) => {
  var username = req.body.username
  var city = req.body.city.toLowerCase();
  city = city.replace(/\s/g,'');
  var major = req.body.major.toLowerCase();
  major = major.replace(/\s/g,'');
  const doc = await User.findOne({username: username});
  doc.firstName = req.body.firstName;
  doc.lastName = req.body.lastName;
  doc.email = req.body.email;
  doc.password = req.body.password;
  doc.city = city;
  doc.major = major;
  doc.GPA = req.body.GPA;

  await doc.save();

})
module.exports = router;


