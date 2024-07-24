const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  poster: { type: String, default: null },
  name: { type: String, required: true },
  description: { type: String, required: true, maxlength: 1000 },
  progress: { type: String, default: null },
  targetAmount: { type: Number, required: true },
  smallestTokenAmount: { type: Number, required: true, min: 10 },
  numberOfTokens: { type: Number, required: true },
  projectStartDate: { type: Date, required: true },
  projectEndDate: { type: Date, required: true },
  country: {
    type: String,
    required: true,
  },
  tags: [String], // Array of tags for search and categorization
  filmmaker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['draft', 'public', 'private'],
    default: 'draft',
  },
  contributionDetails: {
    type: {
      bankAccount: { type: String, default: null },
      mobileMoney: { type: String, default: null },
      paypal: { type: String, default: null },
    },
    details: { type: String, required: true },
  },
  smartContractDetails: {
    roi: { type: Number, required: true },
    dateOfRoi: { type: Date, required: true },
    flopPlan: { type: String, required: true },
  },
});

projectSchema.pre('save', function (next) {
  this.numberOfTokens = Math.ceil(this.targetAmount / this.smallestTokenAmount / 10) * 10;
  next();
});

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;
