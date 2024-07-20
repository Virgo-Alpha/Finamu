import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <ul className="footer-nav">
          <li><a href="#join">Join Us</a></li>
          <li><a href="#blog">Blog</a></li>
          <li><a href="#contact">Contact Us</a></li>
          <li>
            <form>
              <input type="email" placeholder="Subscribe to our newsletter" required />
              <button type="submit">Subscribe</button>
            </form>
          </li>
        </ul>
        <p>&#169; 2024 Finamu. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
