  
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
  const friends = [];
  const pending = [];


  const newUser = new User({username, firstName, lastName, email, password, city, major, GPA, friends, pending});

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
  const doc = await User.findOne({username: username});
  doc.firstName = req.body.firstName;
  doc.lastName = req.body.lastName;
  doc.email = req.body.email;
  doc.password = req.body.password;
  doc.city = req.body.city;
  doc.major = req.body.major;
  doc.GPA = req.body.GPA;

  await doc.save();

});

router.post('/requestFriend', async(req, res) => {
  var requestedName = req.body.friendname;
  var requestingName = req.body.username;
  console.log(requestedName);

  const requested = await User.findOne({username: requestedName});
  console.log("Requested:", requested.username)
  requested.pending.push(requestingName);
  await requested.save();
  res.json({"message": "Received a friend request from: " + requestingName});

  const requesting = await User.findOne({username: requestingName});
  requesting.pending.push(requestedName);
  await requesting.save()
  res.json({"message": "A friend request to: " + requestingName + " is submitted"});
});

 

module.exports = router;
