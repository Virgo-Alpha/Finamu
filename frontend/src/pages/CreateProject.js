import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    // numberOfTokens: 1234,
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
    if (name.startsWith('contributionDetails.') || name.startsWith('smartContractDetails.')) {
      const [section, field] = name.split('.');
      setProjectData(prevState => ({
        ...prevState,
        [section]: {
          ...prevState[section],
          [field]: value
        }
      }));
    } else {
      setProjectData(prevState => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleContributionTypeChange = (e) => {
    setProjectData(prevState => ({
      ...prevState,
      contributionDetails: {
        ...prevState.contributionDetails,
        type: e.target.value,
      }
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post('/api/projects/create', projectData);
      console.log('Project created:', result);
      navigate('/');
    } catch (error) {
      console.error('Error response data:', error.response.data);
      navigate('/projects/create');
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
