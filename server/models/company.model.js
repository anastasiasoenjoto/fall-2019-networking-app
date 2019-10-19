const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
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
  },
  field:{
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
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;