// CreateProject.js (Frontend - React Component)
import React, { useState } from 'react';
import axios from 'axios';

const CreateProject = () => {
  const [projectData, setProjectData] = useState({
    name: '',
    description: '',
    targetAmount: '',
    country: '',
    // Additional fields as needed
  });

  const handleChange = (e) => {
    setProjectData({ ...projectData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/projects', projectData).then((response) => {
      console.log('Project created:', response.data);
      // Redirect to project page or dashboard
    });
  };

  return (
    <div className="create-project">
      <h2>Create a New Project</h2>
      <form onSubmit={handleSubmit}>
        <label>Project Name</label>
        <input name="name" value={projectData.name} onChange={handleChange} />
        
        <label>Description</label>
        <textarea name="description" value={projectData.description} onChange={handleChange} />

        <label>Target Amount</label>
        <input name="targetAmount" value={projectData.targetAmount} onChange={handleChange} />

        <label>Country</label>
        <input name="country" value={projectData.country} onChange={handleChange} />
        
        {/* Additional form fields */}

        <button type="submit">Create Project</button>
      </form>
    </div>
  );
};

export default CreateProject;
