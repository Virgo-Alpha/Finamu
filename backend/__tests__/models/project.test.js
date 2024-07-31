require('dotenv').config();
const mongoose = require('mongoose');
const Project = require('../../models/Project');

describe('Project Model Test', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it('should create a project and calculate number of tokens', async () => {
    const projectData = { name: 'Test Project', description: 'Description', targetAmount: 1000, smallestTokenAmount: 100, projectStartDate: new Date(), projectEndDate: new Date(), country: 'Testland', filmmaker: new mongoose.Types.ObjectId(), risk: 'medium' };
    const project = new Project(projectData);
    await project.save();

    expect(project.numberOfTokens).toBe(10); // Ensure the tokens are calculated correctly
  });
});
