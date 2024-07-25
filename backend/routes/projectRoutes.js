const express = require('express');
const { createProject, getProjects, updateProject, getPublicProjects } = require('../controllers/projectController');
const Project = require('../models/Project'); // Model import
const router = express.Router();

// Route to create a new project
router.post('/', createProject);

// Route to get all public projects
router.get('/public', async (req, res) => {
  try {
    const publicProjects = await Project.find({ status: 'public' });
    res.json(publicProjects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to get all projects with optional search and filter
router.get('/', async (req, res) => {
  const { search, country, tags } = req.query;

  let query = { status: 'public' }; // Default to public projects only

  if (search) {
    query.name = { $regex: search, $options: 'i' };
  }

  if (country) {
    query.country = country;
  }

  if (tags) {
    query.tags = { $in: tags.split(',') };
  }

  try {
    const projects = await Project.find(query);
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id', updateProject);
router.get('/', getProjects); // Get all projects for the current user
router.get('/public', getPublicProjects); // Get all public projects

module.exports = router;
