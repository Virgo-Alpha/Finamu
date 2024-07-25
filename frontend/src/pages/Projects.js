import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get('/api/projects/public');
        console.log(res.data);
        setProjects(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div>
      <h1>Public Projects</h1>
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

export default Projects;
