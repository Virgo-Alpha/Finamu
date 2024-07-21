import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../assets/css/LogIn.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;
  const history = useNavigate();

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/login', formData);
      console.log(res.data);
      history('/dashboard'); // Redirect to a dashboard or another page upon successful login
    } catch (err) {
      console.error(err.response.data);
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
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email Address:</label>
              <input type="email" id="email" name="email" value={email} onChange={onChange} required className="formControl" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" name="password" value={password} onChange={onChange} required className="formControl" />
            </div>
            <button type="submit" className={`btn btn-primary $"btnBlock}`}>Login</button>
          </form>
          <p className="mt-4 textCenter">
            Don't have an account? <a href="/register" className="font-medium">Register</a>
          </p>
        </div>
      </div>
    </div>
      <Footer />
    </>
  );
};

export default Login;
