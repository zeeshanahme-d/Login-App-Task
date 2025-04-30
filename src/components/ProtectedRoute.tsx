import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const ComponentWithAuth = (props: P) => {
    const { user } = useAuth();

    if (!user) {
      return <Navigate to="/" replace />;
    }

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuth;
};

export default ProtectedRoute;