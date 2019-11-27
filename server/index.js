const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

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


app.use('/users', usersRouter);
app.use('/company', companyRouter);
app.use('/jobs', jobsRouter);
app.use('/notifications', notificationRouter)


app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

