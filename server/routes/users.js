const router = require('express').Router();
const Chatkit = require('@pusher/chatkit-server');

let User = require('../models/user.model');

const chatkit = new Chatkit.default({
  instanceLocator: 'v1:us1:51ce7520-0dcf-4a08-87e2-018408ae7fe7',
  key: '4359eab2-fb25-499f-ba61-5c694c95e76b:c7g74+1ZKtPUIpLnDhlSvpaDsInSywu8oPhfqjk2b1o='
});

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post( (req, res) => {
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

  chatkit
    .createUser({
      id: username,
      name: firstName,
    })
    .then(() => {
      res.sendStatus(201);
    })
    .catch(err => {
      if (err.error === 'services/chatkit/user_already_exists') {
        console.log(`User already exists: ${username}`);
        res.sendStatus(200);
      } else {
        res.status(err.status).json(err);
      }
    });

  const pendingApplication = [];
  const closedApplication = [];
  const newUser = new User({username, firstName, lastName, email, password, city, major, GPA, friends, pending, pendingApplication, closedApplication});

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
  major2 = major.toLowerCase();
  city2 = city.toLowerCase();
  major2 = major2.replace(/\s/g,'');
  city2= city2.replace(/\s/g,'');
  console.log(major2, city2, major, city)
  console.log('message received')
  if (username && major && GPA && city){
    User.find({username, major: { $in : [major, major2]} , GPA: {$gt :GPA}, city: { $in : [city,city2]}}, function(err, user){
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

        res.json({"message": message, "users" : user});
    })
  }
  if (major && GPA && city){
    User.find({ major: { $in : [major, major2]}, GPA: {$gt :GPA}, city: { $in : [city,city2]}}, function(err, user){
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

        res.json({"message": message, "users" : user});
    })
  }
  if (username && major && GPA){
    User.find({username: username, GPA: {$gt :GPA},  major: { $in : [major, major2]}}, function(err, user){
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

        res.json({"message": message, "users" : user});
    })
  }
  if (username && major && city){
    User.find({username: username, major: { $in : [major, major2]}, city:  { $in : [city,city2]}}, function(err, user){
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

});

router.post('/approveFriend', async(req, res) => {
  var approvingName = req.body.username;
  var approvedName = req.body.friendname;

  const approvingDetails = {
    username: req.body.username,
    date: req.body.date
  }

  const approvedDetails = {
    username : req.body.friendname,
    date: req.body.date
  }

  const approved = await User.findOne({username: approvedName});

  if(approved.pending.includes(approvingName) === false){
    //res.json({"array": approved.pending});
    approved.friends.push(approvingDetails);
    console.log(approved.friends);
    await approved.save();
  }

  const approving = await User.findOne({username: approvingName});

  // create chatroom of approving for approved
  await chatkit
    .createRoom({
      id: `${approvingName}_${approvedName}`,
      creatorId: approvingName,
      name: `${approvingName} and ${approvedName}'s chat`,
      isPrivate: true,
    })
      .then(() => {
        console.log('Room created successfully');
      }).catch((err) => {
        console.log(err);
      });
  

  chatkit
    .addUsersToRoom({
      roomId: `${approvingName}_${approvedName}`,
      userIds: [approvedName]
    })
      .then(() => console.log('added'))
      .catch(err => console.error(err))

  var index = approving.pending.indexOf(approvedName);
    if(index > -1){
      approving.pending.splice(index, 1);
      res.json({"message": approving.pending})
      approving.friends.push(approvedDetails);
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


// add function to add to pending (when they apply) 
router.post('/addApplication', async (req, res) => {
  var jobId = req.body.jobId;
  var user = req.body.username;
  console.log("User", user)
  console.log("JobId", jobId)

  const doc = await User.findOne({username: user});
  doc.pendingApplication.push(jobId)
  await doc.save();
  res.json({"message": "applicantion added"})
  
});

// add function to move to closed (if they approve or they get rejected)
router.post('/closeApplication', async (req, res) => {

  console.log("hello", req.body.details.split(':'));

  var status = req.body.status;
  var details = req.body.details;
  var company = req.body.company;

  details = details.split(':')
  var jobId = details[0]
  var jobTitle = details[1]
  var user = details[2]

  console.log("User", user)
  console.log("JobId", jobId)
  console.log("jobTitle", jobTitle)
  
  const jobDetails = {
    jobId: jobId, 
    jobTitle: jobTitle, 
    company: company, 
    status: status
  }
  
  const doc = await User.findOne({_id: user});
  doc.closedApplication.push(jobDetails)
  doc.pendingApplication.pull(jobId)
  await doc.save();
  res.json({"message": "applicantion closed"})
  
});

router.post('/analytics', async (req, res) => {
  var currentDate = new Date();
  var oneWeek = new Date();
  var username = req.body.username;
  var count = 0;
  oneWeek.setDate(currentDate.getDate() - 7);
  oneWeek = oneWeek.getTime()
  User.find({})
    .then(users => {
      return users
    })
    .then(users => {
      users.forEach(user => {
        user.friends.forEach(friends => {
          if ((friends.username == username) && ((new Date(friends.date)).getTime()) >= oneWeek) {
                count = count + 1
            }
        })
      })
      return count
    })
    .then(count => {
      res.json({"count": count})
    })
  })
module.exports = router;
