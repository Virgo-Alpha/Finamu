import React from 'react';
import jobImage from '../assets/images/jobs.jpeg'; 
import economicImage from '../assets/images/money.jpeg'; 
import socialImage from '../assets/images/social-good.jpg'; 
import '../assets/css/ImpactMetrics.css'; 

const ImpactMetrics = () => {
  return (
    <section id="impact" className="impact-section">
      <div className="container">
        <div className="impact-container">
          <img src={jobImage} alt="Jobs Created" className="impact-image" />
          <p>1000+ jobs created</p>
        </div>
        <div className="impact-container">
          <img src={economicImage} alt="Economic Benefits" className="impact-image" />
          <p>$500,000+ invested in various projects</p>
        </div>
        <div className="impact-container">
          <img src={socialImage} alt="Social Impact" className="impact-image" />
          <p>Numerous community projects funded and supported</p>
        </div>
      </div>
    </section>
  );
};

export default ImpactMetrics;
