// CreateProject.js (Frontend - React Component)
import React, { useState } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import ProjectForm from '../components/ProjectForm';
import '../assets/css/CreateProject.css';

const CreateProject = () => {
  const [projectData, setProjectData] = useState({
    poster: '',
    name: '',
    description: '',
    progress: '',
    targetAmount: '',
    smallestTokenAmount: '',
    numberOfTokens: '',
    country: '',
    projectStartDate: '',
    projectEndDate: '',
    tags: [],
    filmmaker: '',
    status: 'draft',
    contributionDetails: {
      type: '',
      accountName: '',
      accountNumber: '',
      swiftCode: '',
      phoneNumber: '',
    },
    contractAddress: '',
    smartContractDetails: {
      payoutDate: '',
      percentagePaidOut: '',
      flopPlan: '',
    },
    risk: 'low',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData(prevState => ({
      ...prevState,
      [name]: value,
      contributionDetails: {
        ...prevState.contributionDetails,
        [name.split('.').slice(-1)[0]]: value, // Dynamic field handling
      },
      smartContractDetails: {
        ...prevState.smartContractDetails,
        [name.split('.').slice(-1)[0]]: value, // Dynamic field handling
      }
    }));
  };

  const handleContributionTypeChange = (e) => {
    setProjectData({
      ...projectData,
      contributionDetails: {
        ...projectData.contributionDetails,
        type: e.target.value,
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/projects', projectData);
      console.log('Project created:', response.data);
      // Redirect to project page or dashboard
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  return (
    <div className="create-project">
      <NavBar />
      <div className="content">
        <h2>Create a New Project</h2>
        <ProjectForm
          projectData={projectData}
          handleChange={handleChange}
          handleContributionTypeChange={handleContributionTypeChange}
          handleSubmit={handleSubmit}
        />
      </div>
      <Footer />
    </div>
  );
};

export default CreateProject;
