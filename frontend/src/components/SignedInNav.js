import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/NavBar.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// ! Make faq, my investments page, 

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Send request to the server to log out
      await axios.post('/api/auth/logout');
      // Redirect to the home page or login page
      navigate('/');
    } catch (error) {
      console.error('Error during logout', error);
    }
  };

  return (
    <header className="bg-purple py-2 fixed-top">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <span className="logo-text text-black font-weight-bold">Finamu</span>
        <ul className="d-flex list-unstyled mb-0 ml-auto">
        <li><Link to="/dashboard" className="btn btn-primary mx-1">All Projects</Link></li>
        <li><Link to="/user-projects" className="btn btn-primary mx-1">My Projects</Link></li>
          <li><Link to="/my-investments" className="btn btn-primary mx-1">My Investments</Link></li>
          <li><Link to="/projects/create" className="btn btn-primary mx-1">Create Project</Link></li>
          <li><Link to="/faq" className="btn btn-primary mx-1">FAQs</Link></li>
          <li><button onClick={handleLogout} className="btn btn-primary mx-1">Log Out</button></li>
        </ul>
      </div>
    </header>
  );
};

export default NavBar;
