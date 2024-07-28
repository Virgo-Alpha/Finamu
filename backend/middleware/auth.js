const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Project = require('../models/Project');
const fs = require('fs');

const authenticateToken = (req, res, next) => {
  // Check for the session ID in cookies
  const sessionID = req.cookies['connect.sid'];

  if (!sessionID) {
    return res.status(401).json({ message: 'Access denied' });
  }
  console.dir(req.session, { depth: null });

  // Check if the session ID is valid
  if (!req.session.userId) {
    return res.status(403).json({ message: 'Invalid session' });
  }

  // Attach user information to the request object
  req.user = { id: req.session.userId };
  next();
};

const checkFilmmakerOwnership = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id).populate('filmmaker', 'firstName lastName');
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
