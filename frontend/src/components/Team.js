import React from 'react';
import benImage from '../assets/images/ben.jpeg';
import patronImage from '../assets/images/patron.jpeg';

const Team = () => {
  return (
    <section id="team" className="team-section">
      <div className="container">       
            <div className="row justify-content-center">
              <br />
            <h3>Our Team</h3>
            <br />
                <div className="col-md-4 text-center mb-4">
                <img className='founder' src={benImage} alt="Founder" />
                    <h4 className="mt-3 mb-1">Benson Mugure</h4>
                    <p>Founder</p>
                </div>
                <div className="col-md-4 text-center mb-4">
                <img className='founder' src={patronImage} alt="Patron" />
                    <h4 className="mt-3 mb-1">Strive Masiyiwa</h4>
                    <p>Advisor</p>
                </div>
            </div>
        </div>
    </section>
  );
};


export default Team;
