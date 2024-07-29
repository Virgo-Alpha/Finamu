import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../components/SignedInNav';
import '../assets/css/ProjectDetail.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`/api/projects/${id}`);
        setProject(response.data.project);
      } catch (error) {
        console.error('Error fetching project details:', error);
      }
    };
    fetchProject();
  }, [id]);

  const navigate = useNavigate();

  const handleInvestClick = () => {
    navigate(`/projects/${id}/invest`, { state: { projectName: project.name, filmmakerfirstName: project.filmmaker.firstName, filmmakerlastName: project.filmmaker.lastName } });
  };

  if (!project) return <p>Loading...</p>;

  return (
    <div className="container">
      <NavBar />
      <div className="project-detail">
        <img src={`http://localhost:5000/${project.poster}`} alt={project.name} className="img-fluid" style={{ width: '100%' }} />
        <h1>{project.name} <small>by {project.filmmaker.firstName} {project.filmmaker.lastName}</small></h1>
        <div className="description-header">
          <h3 style={{ display: 'inline', fontWeight: 'bold', textDecoration: 'underline' }}>Description</h3>
          <button onClick={handleInvestClick}>Invest</button>
        </div>
        <p>{project.description}</p>
      </div>
    </div>
  );
};

export default ProjectDetail;
