import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/NavBar.css';

const NavBar = () => {
  return (
    <header className="bg-purple py-2 fixed-top">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <span className="logo-text text-black font-weight-bold">Finamu</span>
        <ul className="d-flex list-unstyled mb-0 ml-auto">
          <li><Link to="/" className="btn btn-primary mx-1">Home</Link></li>
          <li><Link to="/contact" className="btn btn-primary mx-1">Contact Us</Link></li>
          <li><Link to="/blog" className="btn btn-primary mx-1">Blog</Link></li>
          <li><Link to="/signup" className="btn btn-primary mx-1">Sign Up</Link></li>
          <li><Link to="/login" className="btn btn-primary mx-1">Log In</Link></li>
        </ul>
      </div>
    </header>
  );
};

export default NavBar;
