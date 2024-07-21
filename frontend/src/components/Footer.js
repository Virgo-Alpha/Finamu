import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-nav-container">
          <ul className="footer-nav">
          <li><Link to="/register">Join Us</Link></li>
            <li><a href="#blog">Blog</a></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>
        <div className="footer-subscription-container">
          <p>Register for our Newsletter</p>
          <form>
            <input type="email" placeholder="Subscribe to our newsletter" required />
            <button type="submit">Subscribe</button>
          </form>
          <p>Just want to say hi? Send us an email at finamu@gmail.com</p>
          <p>&#169; 2024 Finamu. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
