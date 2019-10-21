const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const companySchema = new Schema({
 companyName:{
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  email:{
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  password:{
    type: String,
    required: true,
    unique: false,
    trim: true,
    minlength: 3
  },
  city:{
    type: String,
    required: true,
    unique: true,
    trim: true,
  }
}, {
  timestamps: true,
});

const company = mongoose.model('Company', companySchema);

module.exports = company;