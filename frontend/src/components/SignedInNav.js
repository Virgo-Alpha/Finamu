import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/NavBar.css';

// ! Make faq, my investments page, 

const NavBar = () => {
  return (
    <header className="bg-purple py-2 fixed-top">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <span className="logo-text text-black font-weight-bold">Finamu</span>
        <ul className="d-flex list-unstyled mb-0 ml-auto">
          <li><Link to="/" className="btn btn-primary mx-1">My Investments</Link></li>
          <li><Link to="/projects/create" className="btn btn-primary mx-1">Create Project</Link></li>
          <li><Link to="/faq" className="btn btn-primary mx-1">FAQs</Link></li>
          <li><Link to="/contact" className="btn btn-primary mx-1">Contact Us</Link></li>
          <li><Link to="/" className="btn btn-primary mx-1">Log Out</Link></li>
        </ul>
      </div>
    </header>
  );
};

export default NavBar;
