  
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
  const pending = [];

  city = city.toLowerCase();
  city = city.replace(/\s/g,'');
  major = major.toLowerCase();
  major = major.replace(/\s/g,'');

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

});

router.post('/requestFriend', async(req, res) => {
  var requestedName = req.body.friendname;
  var requestingName = req.body.username;
  console.log(requestedName);

  const requested = await User.findOne({username: requestedName});
  console.log("Requested:", requested.username)

  if(requested.pending.includes(requestingName) === false){
    requested.pending.push(requestingName);
    await requested.save();
    res.json({"message": "Received a friend request from: " + requestingName});
  }

  /** 

  const requesting = await User.findOne({username: requestingName});
  requesting.pending.push(requestedName);
  await requesting.save()
  res.json({"message": "A friend request to: " + requestingName + " is submitted"});

  */
});

router.post('/approveFriend', async(req, res) => {
  var approvingName = req.body.username;
  var approvedName = req.body.friendname;

  const approved = await User.findOne({username: approvedName});

  if(approved.pending.includes(approvingName) === false){
    //res.json({"array": approved.pending});
    approved.friends.push(approvingName);
    console.log(approved.friends);
    await approved.save();
    //res.json({"message": approved.friends});
  }

  const approving = await User.findOne({username: approvingName});

  var index = approving.pending.indexOf(approvedName);
    if(index > -1){
      approving.pending.splice(index, 1);
      res.json({"message": approving.pending})
      approving.friends.push(approvedName);
      await approving.save();
    }

})

router.post('/rejectFriend', async(req, res) => {
  var rejectingName = req.body.username;
  var rejectedName = req.body.friendname;

  const rejecter = await User.findOne({username: rejectingName});

  if(rejecter.pending.includes(rejectedName)){
    console.log("rejecter: ", rejectingName);
    console.log("rejected: ", rejectedName);
    var index = rejecter.pending.indexOf(rejectedName);
    if(index > -1){
      rejecter.pending.splice(index, 1);
    }
    await requested.save();
    res.json({"message": "You have rejected a friend request from:" + rejectedName});

  }
})

module.exports = router;
