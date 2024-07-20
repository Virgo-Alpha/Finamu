import React from 'react';
import NavBar from '../components/NavBar';
import Header from '../components/Header';
import AboutUs from '../components/AboutUs';
import Team from '../components/Team';
import ImpactMetrics from '../components/ImpactMetrics';
import Testimonials from '../components/Testimonials';
import Map from '../components/Map';
import Footer from '../components/Footer';
import '../assets/css/LandingPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function LandingPage() {
  return (
    <div>
      <NavBar />
      <Header />
      <AboutUs />
      <Team />
      <ImpactMetrics />
      <Testimonials />
      <Map />
      <Footer />
    </div>
  );
}

export default LandingPage;
