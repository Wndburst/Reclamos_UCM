import React, { useContext, useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import axios from 'axios';

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, loading, setUser } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    if (!loading && (!user || !allowedRoles.includes(user.usertype))) {
      axios.get('http://localhost:8000/logout').then(() => {
        setUser(null);
      }).catch(err => console.error(err));
    }
  }, [loading, user, allowedRoles, setUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    user && allowedRoles.includes(user.usertype) ? (
      <Outlet />
    ) : (
      <Navigate to="/login" state={{ from: location }} />
    )
  );
};

export default ProtectedRoute;
