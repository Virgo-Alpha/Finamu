const express = require('express');
const { createProject, getProjects } = require('../controllers/projectController');

const router = express.Router();

router.post('/create', createProject);

// GET /api/projects - Get all projects with search and filter functionality
router.get('/', async (req, res) => {
    const { search, country, tags } = req.query;
    
    let query = {};
  
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
  

module.exports = router;
