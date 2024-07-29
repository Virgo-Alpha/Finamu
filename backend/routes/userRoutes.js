const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const { authenticateToken, checkFilmmakerOwnership } = require('../middleware/auth');
const Project = require('../models/Project');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/projects', authenticateToken, async (req, res) => {
    console.log("Getting the projects of " + req.session.userId)
    try {
      console.log("Trying to fetch user projects...")
      const userId = req.session.userId;
      const projects = await Project.find({ filmmaker: userId });
      res.status(200).json(projects);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching projects', error });
    }
  });
  

module.exports = router;
