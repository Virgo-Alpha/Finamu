const express = require('express');
const router = express.Router();
const { authenticateToken, checkFilmmakerOwnership } = require('../middleware/auth');
const Investment = require('../models/Investment');
const Project = require('../models/Project');

// POST /api/investments/:projectId - Create an investment
router.post('/:projectId', authenticateToken, checkFilmmakerOwnership, async (req, res) => {
  const { amount } = req.body;

  try {
    const investment = new Investment({
      investor: req.user.id,
      project: req.params.projectId,
      amount,
    });

    await investment.save();
    res.status(201).json(investment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
