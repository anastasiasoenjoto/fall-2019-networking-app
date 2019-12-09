const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const jobSchema = new Schema({
    companyUsername:{
        type: String,
        required: true,
        //unique: true,
        trim: true,
        minlength: 1 
    },
    jobTitle:{
        type: String,
        required: true,
        //unique: false,
        trim: true,
        minlength: 1 
    },
    numOfPositions:{
        type: String,
        required: true,
        //unique: false,
        trim: true,
        minlength: 1 
    },
    jobDescription:{
        type: String,
        required: true,
        //unique: false,
        trim: true,
        minlength: 1 
    },
    jobLocation:{
        type: String,
        required: true,
        //unique: false,
        trim: true,
        minlength: 1 
    },
    jobSalary:{
        type: String,
        required: true,
        //unique: false,
        trim: true,
        minlength: 1 
    },
    gpaReq:{
        type: String,
        required: true,
        //unique: false,
        trim: true,
        minlength: 1 
    },
    applicationDeadline:{
        type: String,
        required: true,
        //unique: false,
        trim: true,
        minlength: 1 
    },
    applicants:{
      type: Array,
      required: true,
      //unique: false,
      // trim: true,
      // minlength: 1 
  }
}, {
    timestamps: true,
})

const Job = mongoose.model('Jobs', jobSchema);

module.exports = Job;