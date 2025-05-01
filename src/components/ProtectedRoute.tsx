import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = (Component: React.ComponentType) => {
  return function WrappedComponent(props: any) {
    const { user } = useAuth();

    if (!user) {
      return <Navigate to="/" replace />;
    }

    return <Component {...props} />;
  };
};

export default ProtectedRoute;