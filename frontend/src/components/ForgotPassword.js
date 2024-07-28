import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/auth/forgot-password', { email });
      setMessage('Password reset link has been sent to your email.');
    } catch (err) {
      setMessage('Failed to send reset link.');
    }
  };

  return (
    <>
      <NavBar />
      <div className="forgotPasswordContainer">
        <div className="card">
          <div className="cardHeader">
            <h2>Forgot Password</h2>
          </div>
          <div className="cardBody">
            {message && <p>{message}</p>}
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email Address:</label>
                <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="formControl" />
              </div>
              <button type="submit" className="btn btn-primary btnBlock">Send Reset Link</button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ForgotPassword;
