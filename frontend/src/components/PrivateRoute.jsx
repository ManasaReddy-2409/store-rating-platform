import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, user, requiredRole }) => {
    const userRole = localStorage.getItem('role');

    if (!userRole || userRole !== requiredRole) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default PrivateRoute;