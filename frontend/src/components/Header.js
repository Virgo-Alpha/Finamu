import React from 'react';
import Launch from '../assets/images/Launch.jpeg';
import '../assets/css/Header.css'; // Assuming you have CSS for styling
import TypingEffect from './TypingEffect'; // Import the TypingEffect component

function Header() {
  return (
    <div className="header">
      <img src={Launch} alt="Invest in African Films" className="header-img" />
      <div className="header-text">
        <TypingEffect text="Invest in African Films with as little as $10" />
      </div>
    </div>
  );
}

export default Header;
