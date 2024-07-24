const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Project = require('../models/Project');

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ message: 'Access denied' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });

    req.user = user;
    next();
  });
};

const checkFilmmakerOwnership = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    if (project.filmmaker.toString() === req.user.id) {
      return res.status(403).json({ message: 'Cannot invest in your own project' });
    }

    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { authenticateToken, checkFilmmakerOwnership };
