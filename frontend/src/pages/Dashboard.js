import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../components/SignedInNav';
import Footer from '../components/Footer';
import '../assets/css/Dashboard.css';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    risk: [],
    tags: [],
    country: []
  });

  const countries = ['Nigeria', 'Kenya', 'South Africa', 'Ghana', 'Egypt'];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Send filters as query parameters
        const response = await axios.get('/api/projects/public', { params: filters });
        setProjects(response.data);
      } catch (error) {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          alert('You are not logged in or do not have access. Please log in to continue.');
          navigate('/login');
        } else {
          console.error('Error fetching projects:', error);
        }
      }
    };
    fetchProjects();
  }, [filters]);

  const handleFilterChange = (section, value) => {
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters };
      if (newFilters[section].includes(value)) {
        newFilters[section] = newFilters[section].filter((item) => item !== value);
      } else {
        newFilters[section].push(value);
      }
      console.log('Updated Filters:', newFilters);
      return newFilters;
    });
  };  

  const handleClearFilters = () => {
    setFilters({
      risk: [],
      tags: [],
      country: []
    });
  };

  const calculateDaysLeft = (endDate) => {
    const today = new Date();
    const end = new Date(endDate);
    return Math.ceil((end - today) / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="dashboard">
      <NavBar />
      <div className="filters">
        <button onClick={handleClearFilters}>Clear Filters</button>
        <div className="filter-section">
          <h3>Risk</h3>
          {['High', 'Medium', 'Low'].map((risk) => (
            <label key={risk}>
              <input
                type="checkbox"
                checked={filters.risk.includes(risk)}
                onChange={() => handleFilterChange('risk', risk)}
              />
              {risk}
            </label>
          ))}
        </div>
        <div className="filter-section">
          <h3>Tags</h3>
          {['Drama', 'Crime', 'Mystery', 'Romance', 'Documentary', 'Rom-Com', 'Politics', 'War', 'Other'].map((tag) => (
            <label key={tag}>
              <input
                type="checkbox"
                checked={filters.tags.includes(tag)}
                onChange={() => handleFilterChange('tags', tag)}
              />
              {tag}
            </label>
          ))}
        </div>
        <div className="filter-section">
          <h3>Country</h3>
          {countries.map((country) => (
            <label key={country}>
              <input
                type="checkbox"
                checked={filters.country.includes(country)}
                onChange={() => handleFilterChange('country', country)}
              />
              {country}
            </label>
          ))}
        </div>
      </div>
      <div className="projects">
        <h1>Projects ({projects.length})</h1>
        <div className="project-list">
          {projects.map((project) => {
            const filmmakerName = project.filmmaker ? `${project.filmmaker.firstName} ${project.filmmaker.lastName}` : 'Unknown Filmmaker';
            return (
              <div key={project._id} className="project-item">
                <div className="project-poster">
                  <img src={`http://3.232.6.164/${project.poster}`} alt={project.name} />
                </div>
                <div className="project-details">
                <Link to={`/projects/${project._id}`}><h2>{project.name} by {filmmakerName}</h2></Link>
                  <p>{project.description}</p>
                  <p className="project-tags">
                    {project.tags.map(tag => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </p>
                </div>
                <div className="project-info">
                  <p>Target: {project.targetAmount}</p>
                  <p>Days left to deadline: {calculateDaysLeft(project.projectEndDate)}</p>
                  <p>Amount contributed: {project.amountContributed || 'N/A'}</p>
                  <p>Risk: {project.risk}</p>
                  <p>Country: {project.country}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
