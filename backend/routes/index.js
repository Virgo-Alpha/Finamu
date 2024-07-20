const express = require('express');
const router = express.Router();
const { getMetrics, getTestimonials } = require('../controllers');

router.get('/api/metrics', getMetrics);
router.get('/api/testimonials', getTestimonials);

module.exports = router;
