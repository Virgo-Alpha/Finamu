// controllers/projectController.js
const Project = require('../models/Project');
const { createProjectTokens } = require('../blockchain/tokenize');
const generateContract = require('../utils/contractTemplate');
const { deployProjectContract } = require('../blockchain/deploy');

const createProject = async (req, res) => {
  try {
    const { name, description, targetAmount, startDate, endDate, isPublic, isDraft } = req.body;
    const filmmakerId = req.user._id; // Assuming user is authenticated

    let contractAddress = '';
    if (isPublic) {
      // Deploy smart contract
      contractAddress = await deployProjectContract(targetAmount, startDate, endDate);
    }

    const project = new Project({
      poster,
      name,
      description,
      progress,
      targetAmount,
      smallestTokenAmount,
      numberOfTokens,
      country,
      projectStartDate,
      projectEndDate,
      tags,
      isDraft,
      filmmaker: filmmakerId,
      contractAddress,
      status,
      contributionDetails,
      smartContractDetails,
      risk,
    });

    await project.save();

    await createProjectTokens(project._id, project.targetAmount, project.smallestTokenAmount, project.projectStartDate, project.projectEndDate);

    const contract = await generateContract(project, req.user, req.body.investor);
    // Save or send contract to the user

    res.status(201).json({ message: 'Project created successfully', project });
  } catch (error) {
    res.status(500).json({ message: 'Error creating project', error });
  }
};

const updateProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const { name, description, targetAmount, startDate, endDate, isPublic, isDraft } = req.body;

    const project = await Project.findById(projectId);

    if (isPublic && !project.contractAddress) {
      // Deploy smart contract if not already done
      project.contractAddress = await deployProjectContract(targetAmount, startDate, endDate);
    }

    project.name = name;
    project.description = description;
    project.targetAmount = targetAmount;
    project.startDate = startDate;
    project.endDate = endDate;
    project.isPublic = isPublic;
    project.isDraft = isDraft;

    await project.save();
    res.status(200).json({ message: 'Project updated successfully', project });
  } catch (error) {
    res.status(500).json({ message: 'Error updating project', error });
  }
};

const getProjects = async (req, res) => {
  try {
    const filmmakerId = req.user._id; // Assuming user is authenticated
    const projects = await Project.find({ filmmaker: filmmakerId });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects', error });
  }
};

const getPublicProjects = async (req, res) => {
  try {
    const projects = await Project.find({ isPublic: true });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching public projects', error });
  }
};

module.exports = {
  createProject,
  updateProject,
  getProjects,
  getPublicProjects,
};
