const express = require('express');
const { createProject, getProjects, updateProject, getPublicProjects } = require('../controllers/projectController');
const Project = require('../models/Project');
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

router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.session.userId;
    const project = await Project.findOne({ _id: id, filmmaker: userId });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check if project status allows editing
    if (project.status !== 'draft' && project.status !== 'private') {
      return res.status(403).json({ message: 'Cannot edit this project' });
    }

    // Loop through req.body to update only changed fields
    for (let [key, value] of Object.entries(req.body)) {
      // Check if the field exists in the project and has changed
      if (project[key] !== undefined && project[key] !== value) {
        project[key] = value;
      }
    }

    // Save the updated project
    await project.save();

    res.status(200).json({ message: 'Project updated', project });
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ message: 'Error updating project', error });
  }
});

router.post('/:id/invest', authenticateToken, (req, res) => {
  console.log('Investment received:');

  // Always return success response because this is a mock API
  res.status(200).json({ message: 'Investment processed successfully.' });
});

router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Deleting project with id: " + id)
    const userId = req.session.userId;
    const project = await Project.findOneAndDelete({ _id: id, filmmaker: userId });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting project', error });
  }
});


module.exports = router;
