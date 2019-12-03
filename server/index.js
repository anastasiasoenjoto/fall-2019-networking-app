const express = require('express');
const expressWs = require('express-ws');

const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");

const io = require("socket.io");

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;
const http = require("http").Server(app);



app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const usersRouter = require('./routes/users');
const companyRouter = require('./routes/company');
const jobsRouter = require('./routes/jobs');
const notificationRouter = require('./routes/notifications');
const chatRouter = require('./routes/chats')

app.use('/users', usersRouter);
app.use('/company', companyRouter);
app.use('/jobs', jobsRouter);
//app.use('/notifications', notificationRouter)
app.use('/chats', chatRouter);

const wsInstance = expressWs(app);


socket = io(http);
app.ws('/comment', (ws, req) => {

  ws.on('message', function incoming(message) {
    console.log(message) ;
    ws.broadcast(message);
  });

  ws.broadcast = function broadcast(data) {
    wsInstance.getWss().clients.forEach(function each(client) {
    client.send(data);
    });
  };
})

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

