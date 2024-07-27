const Project = require('../models/Project');
const { createProjectTokens } = require('../blockchain/tokenize');
const generateContract = require('../utils/contractTemplate');
const { deployProjectContract } = require('../blockchain/deploy');

const createProject = async (req, res) => {
  console.log("We got here man")
  poster = req.file.path;
  try {
    const {
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
      filmmakerId,
      // contractAddress,
      status,
      contributionDetails,
      smartContractDetails,
      risk,
    } = req.body;
    // ! const filmmakerId = req.user._id; // Assuming user is authenticated
    console.dir(req.body, { depth: null });
    console.log("Poster: " + poster)

    let contractAddress = '';
    // if (status === 'public') {
    //   // Deploy smart contract if the project is being made public
    //   contractAddress = await deployProjectContract(targetAmount, projectStartDate, projectEndDate);
    // }
    console.log('contract address: ' + contractAddress)

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
      filmmaker: filmmakerId,
      contractAddress,
      status,
      contributionDetails,
      smartContractDetails,
      risk,
    });
    console.log("We created the project")

    await project.save()
    console.log("We saved the project")

    // Create project tokens
    // await createProjectTokens(project._id, targetAmount, smallestTokenAmount, projectStartDate, projectEndDate);

    // Generate contract
    // const contract = await generateContract(project, req.user, req.body.investor);
    // Save or send the contract to the user (implementation depends on the requirements)

    res.status(201).json({ message: 'Project created successfully', project });
  } catch (error) {
    res.status(500).json({ message: 'Error creating project', error });
  }
};

const updateProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const {
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
      status,
      contributionDetails,
      smartContractDetails,
      risk,
    } = req.body;

    const project = await Project.findById(projectId);

    if (status === 'public' && !project.contractAddress) {
      // Deploy smart contract if not already done and project is being made public
      project.contractAddress = await deployProjectContract(targetAmount, projectStartDate, projectEndDate);
    }

    // Update fields
    project.poster = poster;
    project.name = name;
    project.description = description;
    project.progress = progress;
    project.targetAmount = targetAmount;
    project.smallestTokenAmount = smallestTokenAmount;
    project.numberOfTokens = numberOfTokens;
    project.country = country;
    project.projectStartDate = projectStartDate;
    project.projectEndDate = projectEndDate;
    project.tags = tags;
    project.isDraft = isDraft;
    project.status = status;
    project.contributionDetails = contributionDetails;
    project.smartContractDetails = smartContractDetails;
    project.risk = risk;

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
    const projects = await Project.find({ status: 'public' });
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
