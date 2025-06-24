import React from 'react'
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

    const PrivateRoute = ({ children }) => {
  const isAuthenticated = Cookies.get('token'); // or your auth logic
  return isAuthenticated ? children : <Navigate to="/login" />;
};
export default PrivateRoute