const Project = require('../models/Project');
const { createProjectTokens } = require('../blockchain/tokenize');
const generateContract = require('../utils/contractTemplate');

const createProject = async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();

    await createProjectTokens(project._id, project.targetAmount, project.smallestTokenAmount, project.projectStartDate, project.projectEndDate);

    const contract = await generateContract(project, req.user, req.body.investor);
    // Save or send contract to the user

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createProject,
  getProjects,
};
