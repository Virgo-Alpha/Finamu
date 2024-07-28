require('dotenv').config();
const mongoose = require('mongoose');
const Project = require('../models/Project');
const path = require('path');

const MongoDB_connection_string = process.env.MONGO_URI;

mongoose.connect(MongoDB_connection_string, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// get all projects
const allProjects = Project.find({
  name: 'Test'
})
console.log('All projects:', allProjects);
