import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../assets/css/LogIn.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { email, password } = formData;
  const navigate = useNavigate();

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('api/auth/login', formData);
      navigate('/dashboard'); // Redirect on successful login
    } catch (err) {
      if (err.response && err.response.data.error === 'EMAIL_NOT_FOUND') {
        if (window.confirm('Account not found. Would you like to register?')) {
          navigate('/register');
        }
      } else if (err.response && err.response.data.error === 'INVALID_CREDENTIALS') {
        setError('Invalid email or password. Please try again.');
        // clear form
        setFormData({ email: '', password: '' });
      } else {
        setError('An error occurred. Please try again later.');
        console.dir(error, { depth: null });
      }
    }
  };

  return (
    <>
      <NavBar />
      <div className="loginContainer">
        <div className="card">
          <div className="cardHeader">
            <h2>Login</h2>
          </div>
          <div className="cardBody">
            {error && <p className="text-danger">{error}</p>}
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email:</label><br></br>
                <input type="email" id="email" name="email" value={email} onChange={onChange} required className="formControl" />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label><br></br>
                <input type="password" id="password" name="password" value={password} onChange={onChange} required className="formControl" />
              </div>
              <button type="submit" className="btn btn-primary btnBlock">Login</button>
            </form>
            <p className="mt-4 textCenter">
              Don't have an account? <a href="/register" className="font-medium">Register</a>
            </p>
            <p className="textCenter">
              <a href="/forgot-password" className="font-medium">Forgot Password?</a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
