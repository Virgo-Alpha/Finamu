import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../components/SignedInNav';
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
    country: '',
    projectStartDate: '',
    projectEndDate: '',
    tags: [],
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

  const handleFileChange = (e) => {
    setProjectData({ ...projectData, poster: e.target.files[0] });
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
    const formData = new FormData();
    formData.append('name', projectData.name);
    formData.append('description', projectData.description);
    formData.append('targetAmount', projectData.targetAmount);
    formData.append('smallestTokenAmount', projectData.smallestTokenAmount);
    formData.append('country', projectData.country);
    formData.append('projectStartDate', projectData.projectStartDate);
    formData.append('projectEndDate', projectData.projectEndDate);
    formData.append('tags', projectData.tags);
    formData.append('status', projectData.status);
    formData.append('risk', projectData.risk);
    // Sending each part of the object separately
    formData.append('contributionDetails[type]', projectData.contributionDetails.type);
    formData.append('contributionDetails[accountName]', projectData.contributionDetails.accountName);
    formData.append('contributionDetails[accountNumber]', projectData.contributionDetails.accountNumber);
    formData.append('contributionDetails[swiftCode]', projectData.contributionDetails.swiftCode);
    formData.append('contributionDetails[phoneNumber]', projectData.contributionDetails.phoneNumber);

    formData.append('smartContractDetails[payoutDate]', projectData.smartContractDetails.payoutDate);
    formData.append('smartContractDetails[percentagePaidOut]', projectData.smartContractDetails.percentagePaidOut);
    formData.append('smartContractDetails[flopPlan]', projectData.smartContractDetails.flopPlan);
    if (projectData.poster) {
      formData.append('poster', projectData.poster);
    }
    try {
      const response = await axios.post('/api/projects/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Project created:', response.data);
      navigate('/dashboard');
    } catch (error) {
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        alert('You are not logged in or do not have access. Please log in to continue.');
        navigate('/login');
      } else {
        console.error('Error fetching projects:', error);
      }
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
          handleFileChange={handleFileChange}
        />
      </div>
      <Footer />
    </div>
  );
};

export default CreateProject;
