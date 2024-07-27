const mongoose = require('mongoose');

// TODO: 1. Add amount contributed
// Amount pending will be the target minus amount contributed
// TODO 2: Make Poster an image upload
// TODO 3. Make contract and tokens

const contributionDetailsSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['bank', 'mpesa', 'juice'],
    required: true,
  },
  accountName: { type: String, default: null }, // Required for 'bank' type
  accountNumber: { type: String, default: null }, // Required for 'bank' type
  swiftCode: { type: String, default: null }, // Required for 'bank' type
  phoneNumber: { type: String, default: null }, // Required for 'mpesa' or 'juice' types
}, { _id: false });

const smartContractDetailsSchema = new mongoose.Schema({
  payoutDate: { type: Date, required: true },
  percentagePaidOut: { type: Number, min: 0, max: 100, required: true },
  flopPlan: { type: String, default: '' },
}, { _id: false });

const projectSchema = new mongoose.Schema({
  poster: { type: String, default: null },
  name: { type: String, required: true },
  description: { type: String, required: true, maxlength: 1000 },
  progress: { type: String, default: null },
  targetAmount: { type: Number, required: true },
  smallestTokenAmount: { type: Number, min: 10 },
  projectStartDate: { type: Date, required: true },
  projectEndDate: { type: Date, required: true },
  country: { type: String, required: true },
  tags: {
    type: [String],
    validate: [tags => tags.length <= 15, 'A maximum of 15 tags are allowed.']
  }, // Array of tags with a maximum of 15 items
  // filmmaker: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  filmmaker: { type: String },
  status: { type: String, enum: ['draft', 'public', 'private'], default: 'draft' },
  contributionDetails: contributionDetailsSchema,
  contractAddress: { type: String, default: '' }, // Smart contract address
  smartContractDetails: smartContractDetailsSchema,
  risk: { type: String, enum: ['low', 'medium', 'high'], required: true },
});

// Hook to automatically calculate the number of tokens
projectSchema.pre('validate', function (next) {
  if (this.isNew || this.isModified('targetAmount') || this.isModified('smallestTokenAmount')) {
    this.numberOfTokens = Math.ceil(this.targetAmount / this.smallestTokenAmount / 10) * 10;

    console.log('Number of tokens: ' + this.targetAmount);
    console.log('Smallest token amount: ' + this.smallestTokenAmount);
    console.log('Target Amount: ' + this.targetAmount)

    console.log('Type of targetAmount:', typeof this.targetAmount);
    console.log('Type of smallestTokenAmount:', typeof this.smallestTokenAmount);

  }
  next();
});

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;
