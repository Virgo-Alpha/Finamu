import React,  { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('/api/projects/public');
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div>
      <h1>Public Projects</h1>
        <nav>
          <Link to="/projects">View Projects</Link>
          <Link to="/create-project">Create Project</Link>
        </nav>
      <ul>
        {projects.map((project) => (
          <li key={project._id}>
            <h2>{project.name}</h2>
            <p>{project.description}</p>
            <p>Risk: {project.risk}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
