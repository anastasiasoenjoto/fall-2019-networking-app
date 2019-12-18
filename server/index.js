const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const io = require("socket.io");
const Chatkit = require('@pusher/chatkit-server');

require('dotenv').config();


const chatkit = new Chatkit.default({
  instanceLocator: process.env.CHATKIT_INSTANCE_LOCATOR,
  key: process.env.CHATKIT_SECRET_KEY,
});
const app = express();
const port = process.env.PORT || 3001;
const http = require("http").Server(app);

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
//const connection = mongoose.connection;

class yourConnection{
  constructor(){
    this.connection = null;
  }
  getConnection(){
    if(this.connection == null){
      this.connection = mongoose.connection;
      return this.connection;
    }
    else{
      return this.connection;
    }
  }
}
 const connectionObj = new yourConnection();
 const connection = connectionObj.getConnection();

connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const usersRouter = require('./routes/users');
const companyRouter = require('./routes/company');
const jobsRouter = require('./routes/jobs');


app.use('/users', usersRouter);
app.use('/company', companyRouter);
app.use('/jobs', jobsRouter);

//chat
app.post('/chatUsers', (req, res) => {
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

app.post('/chatAuthenticate', (req, res) => {
  const authData = chatkit.authenticate({
    userId: req.query.user_id,
  });
  res.status(authData.status).send(authData.body);
});




app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

