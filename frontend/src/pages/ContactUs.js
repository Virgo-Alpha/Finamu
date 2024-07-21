import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import '../assets/css/ContactUs.css';

const ContactUs = () => {
    return (
      <>
        <NavBar />
        <section id="ContactUs" className="contact-us-section">
          <div className="container">
            <h3>Contact Us</h3>
            <div className="row justify-content-center">
              <div className="col-md-8 col-lg-8">
                <form action="https://formsubmit.co/b.mugure@alustudent.com" method="POST">
                  <div className="form-group">
                    <label htmlFor="fname" id="fname-label">First Name:</label>
                    <input type="text" id="fname" name="fname" className="form-control" placeholder="First name" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lname" id="lname-label">Last Name:</label>
                    <input type="text" id="lname" name="lname" className="form-control" placeholder="Last name" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email" id="email-label">Email Address:</label>
                    <input type="email" id="email" name="email" className="form-control" placeholder="Enter your email address" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Please type your message below:</label>
                    <textarea className="form-control" id="message" name="message" rows="10" required></textarea>
                  </div>
                  <input id="submit" type="submit" className="btn btn-primary" value="Submit" />
                </form>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </>
    );
  };

export default ContactUs;
