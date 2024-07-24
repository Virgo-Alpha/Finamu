import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => (
  <div className="dashboard">
    <h1>Welcome to Finamu</h1>
    <nav>
      <Link to="/projects">View Projects</Link>
      <Link to="/create-project">Create Project</Link>
    </nav>
  </div>
);

export default Dashboard;
