const Metrics = require('../models/Metrics');
const Testimonials = require('../models/Testimonials');

const getMetrics = async (req, res) => {
  try {
    const metrics = await Metrics.find();
    res.json(metrics);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonials.find();
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { getMetrics, getTestimonials };
