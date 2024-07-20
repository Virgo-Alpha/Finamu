import React from 'react';
import '../assets/css/AboutUs.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const AboutUs = () => {
  return (
    <section className="about-section">
      <div className="container">
      <div class="row justify-content-center">
      <div class="col-md-12 text-center" id="aboutUs">
        <h2 class="font-weight-bold">What is Finamu?</h2>
        <br />
        <p>Finamu is a revolutionary platform that leverages blockchain technology to democratize film financing in Africa. By providing transparent and secure investment avenues, Finamu enables filmmakers to bring their projects to life and reach a global audience.</p>
        <p>Our technology stack includes blockchain, smart contracts, and a secure payment gateway to ensure seamless transactions and fund management.</p>
        </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
