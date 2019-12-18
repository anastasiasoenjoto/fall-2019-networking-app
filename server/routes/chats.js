const router = require('express').Router();
const Comment = require('../models/chat.model');

const chatkit = new Chatkit.default({
    instanceLocator: v1:us1:51ce7520-0dcf-4a08-87e2-018408ae7fe7,
    key: 4359eab2-fb25-499f-ba61-5c694c95e76b:c7g74+1ZKtPUIpLnDhlSvpaDsInSywu8oPhfqjk2b1o=
  });

router.route('/users').post((req, res) => {
    const { userId } = req.body;

    chatkit
      .createUser({
        id: userId,
        name: userId,
      })
      .then(() => {
        res.sendStatus(201);
      })
      .catch(err => {
        if (err.error === 'services/chatkit/user_already_exists') {
          console.log(`User already exists: ${userId}`);
          res.sendStatus(200);
        } else {
          res.status(err.status).json(err);
        }
      });
});

router.route('/authenticate').post((req, res) => {
    const authData = chatkit.authenticate({
        userId: req.query.user_id,
    });
    res.status(authData.status).send(authData.body);
});


module.exports = router;