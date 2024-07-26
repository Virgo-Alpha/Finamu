import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import '../assets/css/Dashboard.css'; // Import the CSS file for styling

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [filters, setFilters] = useState({
    risk: [],
    tags: [],
    country: []
  });

  // Sample list of countries; you can replace this with actual data
  const countries = ['Nigeria', 'Kenya', 'South Africa', 'Ghana', 'Egypt'];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('/api/projects/public', { params: filters });
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
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
        {projects.map((project) => (
          <div key={project._id} className="project-item">
            <div className="project-poster">
              {/* Placeholder for poster image */}
              <img src={project.poster || '/default-poster.png'} alt={project.name} />
            </div>
            <div className="project-details">
              <h2>{project.name} by {project.filmmaker}</h2>
              <p>{project.description}</p>
              <p className="project-tags">
                {project.tags.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </p>
              <hr></hr>
            </div>
            <div className="project-info">
              <p>Target: {project.targetAmount}</p>
              <p>Days left to deadline: {calculateDaysLeft(project.projectEndDate)}</p>
              <p>Amount contributed: {project.amountContributed || 'N/A'}</p>
              <p>Amount Pending: {project.amountPending || 'N/A'}</p>
              <p>Project Country: {project.country}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
