import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Assuming you have an AuthContext

const PrivateRoute = ({ element: Component, ...rest }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  return isAuthenticated ? Component : <Navigate to="/login" state={{ from: location }} />;
};

export default PrivateRoute;
