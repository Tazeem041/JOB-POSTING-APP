const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a job title'],
    trim: true,
    maxlength: [100, 'Job title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide a job description'],
    maxlength: [1000, 'Job description cannot be more than 1000 characters']
  },
  requirements: {
    type: String,
    required: [true, 'Please provide job requirements'],
    maxlength: [500, 'Job requirements cannot be more than 500 characters']
  },
  salary: {
    type: String,
    required: [true, 'Please provide a salary range'],
    trim: true
  },
  location: {
    type: String,
    required: [true, 'Please provide a job location'],
    trim: true
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);