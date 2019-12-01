const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const jobSchema = new Schema({
  nameOfOpenPosition: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  numOfOpenPositions: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  }, 
  jobDescription: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  gpaRequirement: {
    type: String,
    required: true,
    unique: true
  },
  workExperienceRequirement: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  workLocation: {
    type: String,
    required: true,
    trim: true,

  },
  estimatedSalaryPerHour: {
    type: String,
    required: true,
    trim: true,

  },

  applicationDeadline: {
    type: String,
    required: true,
    trim: true,

  },

  applicants: {
    type: Array,
    // required: true,
    // trim: true,

  },
}, {
  timestamps: true,
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;