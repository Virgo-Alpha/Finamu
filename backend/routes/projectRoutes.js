const express = require('express');
const { createProject, getProjects, updateProject, getPublicProjects } = require('../controllers/projectController');
const Project = require('../models/Project'); // Model import
const router = express.Router();
const { authenticateToken, checkFilmmakerOwnership } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Route to create a new project
router.post('/create', authenticateToken, upload.single('poster'), createProject);

// Route to get all public projects
router.get('/public', authenticateToken, async (req, res) => {
  try {
    const { risk, tags, country } = req.query;

    const filterCriteria = { status: 'public' };

    if (risk) {
      filterCriteria.risk = { $in: risk };
    }
    if (tags) {
      filterCriteria.tags = { $in: tags };
    }
    if (country) {
      filterCriteria.country = { $in: country };
    }

    const publicProjects = await Project.find(filterCriteria).populate('filmmaker', 'firstName lastName');
    res.json(publicProjects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to get all projects with optional search and filter
router.get('/', authenticateToken, async (req, res) => {
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
    const projects = await Project.find(query).populate('filmmaker', 'firstName lastName');
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate('filmmaker', 'firstName lastName');
    res.json({ project });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', authenticateToken, updateProject);
// router.get('/', authenticateToken, getProjects); // Get all projects for the current user
// router.get('/public', authenticateToken, getPublicProjects); // Get all public projects

module.exports = router;
