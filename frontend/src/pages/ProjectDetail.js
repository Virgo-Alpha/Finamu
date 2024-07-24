// ProjectDetail.js (Frontend - React Component)
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState({});

  useEffect(() => {
    axios.get(`/api/projects/${id}`).then((response) => {
      setProject(response.data);
    });
  }, [id]);

  return (
    <div className="project-detail">
      <h2>{project.name}</h2>
      <p>{project.description}</p>
      <p>Target Amount: {project.targetAmount}</p>
      <p>Country: {project.country}</p>
      {/* More project details */}
      <button>Invest</button> {/* Redirect to the investment page */}
    </div>
  );
};

export default ProjectDetail;
