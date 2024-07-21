import React from 'react';
import filmmakerImage from '../assets/images/filmmaker.jpg'; // Example image path, adjust as needed
import investorImage from '../assets/images/investor.jpg'; // Example image path, adjust as needed
import '../assets/css/Testimonials.css'; // Ensure you have this CSS file

const Testimonials = () => {
  return (
    <section id="testimonials" className="testimonials-section">
      <div className="container">
        <h3>What our clients say</h3>
        <div className="testimonial-container">
          <img src={filmmakerImage} alt="Filmmaker A" className="founder" />
          <blockquote className="speech-bubble">
            <p>"Finamu has been a game-changer for my film project. The transparency and ease of use are unparalleled."</p>
            <footer>- James Kiarie, Filmmaker</footer>
          </blockquote>
        </div>
        <div className="testimonial-container">
          <img src={investorImage} alt="Investor B" className="founder" />
          <blockquote className="speech-bubble">
            <p>"Investing in African films has never been easier. Finamu makes it simple and secure."</p>
            <footer>- George White, Film investor.</footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
