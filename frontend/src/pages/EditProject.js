import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../components/SignedInNav';
import Footer from '../components/Footer';
import ProjectForm from '../components/ProjectForm';
import '../assets/css/CreateProject.css';

const EditProject = () => {
  const { id } = useParams();
  const [projectData, setProjectData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const response = await axios.get(`/api/projects/${id}`);
        setProjectData(response.data.project);
      } catch (error) {
        console.error('Error fetching project data:', error);
      }
    };

    fetchProjectData();
  }, [id]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', projectData.name);
    formData.append('description', projectData.description);
    formData.append('targetAmount', projectData.targetAmount);
    formData.append('smallestTokenAmount', projectData.smallestTokenAmount);
    formData.append('country', projectData.country);
    const formattedStartDate = new Date(projectData.projectStartDate).toISOString();
    const formattedEndDate = new Date(projectData.projectEndDate).toISOString();

    formData.append('projectStartDate', formattedStartDate);
    formData.append('projectEndDate', formattedEndDate);

    formData.append('tags', projectData.tags);
    formData.append('status', projectData.status);
    formData.append('risk', projectData.risk);
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
      const response = await axios.put(`/api/projects/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Project updated:', response.data);
      navigate('/user-projects');
    } catch (error) {
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        alert('You are not logged in or do not have access. Please log in to continue.');
        navigate('/login');
      } else {
        console.error('Error updating project:', error);
      }
    }
  };

  return (
    <div className="edit-project">
      <NavBar />
      <div className="content">
        <h2>Edit Project</h2>
        {projectData && (
          <ProjectForm
            projectData={projectData}
            handleChange={handleChange}
            handleContributionTypeChange={handleContributionTypeChange}
            handleSubmit={handleSubmit}
            handleFileChange={handleFileChange}
          />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default EditProject;
