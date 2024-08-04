import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/SignedInNav';
import Footer from '../components/Footer';
import '../assets/css/UserProjects.css';

const UserProjects = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('/api/users/projects');
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error.response);
      }
    };

    fetchProjects();
  }, []);

  const handleEdit = (projectId) => {
    navigate(`/projects/${projectId}/edit`);
  };

  const handleDelete = async (projectId) => {
    try {
      await axios.delete(`/api/projects/${projectId}`);
      setProjects(projects.filter((project) => project._id !== projectId));
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  return (
    <div className="user-projects-page">
      <NavBar />
      <div className="content-container">
        <div className="projects-column">
          <h1>Your Projects ({projects.length})</h1>
          <p>Remember that you can neither edit nor delete your public projects</p>
          <ul>
            {projects.map((project) => (
              <li key={project._id}>
                <div className="project-card">
                  <img src={`https://finamu.io/${project.poster}`} alt={project.name} className="project-poster" />
                  <div className="project-details">
                    <h2>{project.name}</h2>
                    <p>{project.description}</p>
                    <p>Status: {project.status}</p>
                    <button 
                      onClick={() => handleEdit(project._id)}
                      disabled={project.status !== 'draft' && project.status !== 'private'}
                    >
                      Edit
                    </button>
                    <button onClick={() => handleDelete(project._id)}>Delete</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserProjects;
