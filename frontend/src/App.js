import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ContactUs from './pages/ContactUs';
import Register from './pages/Register';
import LogIn from './pages/LogIn';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import CreateProject from './pages/CreateProject';
import ProjectDetail from './pages/ProjectDetail';
import PaymentPage from './pages/PaymentPage';
import UserProjects from './pages/UserProjects'
import EditProject from './pages/EditProject';
import MyInvestments from './pages/MyInvestments';
import FAQPage  from './pages/FAQ';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/dashboard" element={<Dashboard  />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/create" element={<CreateProject />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/user-projects" element={<UserProjects />} />
        <Route path="/projects/:id/invest" element={<PaymentPage />} />
        <Route path="/projects/:id/edit" element={<EditProject />} />
        <Route path="/my-investments" element={<MyInvestments />} />
        <Route path="/faq" element={<FAQPage />} />
      </Routes>
    </Router>
  );
}

export default App;
