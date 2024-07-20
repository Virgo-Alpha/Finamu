const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MetricsSchema = new Schema({
  jobsCreated: Number,
  economicBenefits: Number,
  socialImpact: String,
});

const TestimonialsSchema = new Schema({
  quote: String,
  author: String,
});

const Metrics = mongoose.model('Metrics', MetricsSchema);
const Testimonials = mongoose.model('Testimonials', TestimonialsSchema);

module.exports = { Metrics, Testimonials };
