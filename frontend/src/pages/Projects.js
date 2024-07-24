import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get('/api/projects').then((response) => {
      setProjects(response.data);
    });
  }, []);

  return (
    <div className="projects-list">
      <h2>Available Projects</h2>
      <div className="search-and-filters">
        {/* Add search bar and filters here */}
      </div>
      <ul>
        {projects.map((project) => (
          <li key={project._id}>
            <Link to={`/project/${project._id}`}>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <p>Country: {project.country}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Projects;
