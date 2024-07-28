import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../assets/css/Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: ''
  });

  const { firstName, lastName, email, phoneNumber, password } = formData;
  const navigate = useNavigate();

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/register', formData);
      navigate('/dashboard');
    } catch (err) {
      if (err.response && err.response.status === 400) {
        alert('User already exists. Please log in.');
        navigate('/login');
      } else {
        console.error(err);
      }
    }
  };

  return (
    <>
      <NavBar />
      <div className="register-container">
        <div className="card">
          <div className="card-header">
            <h2>Register</h2>
          </div>
          <div className="card-body">
            <form className="registration" onSubmit={onSubmit}>
              <div className="form-row">
                <div className="col">
                  <label htmlFor="firstName">First Name:</label>
                  <input type="text" id="firstName" name="firstName" value={firstName} onChange={onChange} required className="form-control" />
                </div>
                <div className="col">
                  <label htmlFor="lastName">Last Name:</label>
                  <input type="text" id="lastName" name="lastName" value={lastName} onChange={onChange} required className="form-control" />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={email} onChange={onChange} required className="form-control" />
              </div>
              <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number:</label>
                <input type="tel" id="phoneNumber" name="phoneNumber" value={phoneNumber} onChange={onChange} required className="form-control" />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" value={password} onChange={onChange} required className="form-control" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$" title="Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character" />
              </div>
              <button type="submit" className="btn btn-primary btn-block">Register</button>
            </form>
            <p className="mt-4 text-center">
              Already have an account? <a href="/login" className="font-medium">Sign in</a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
