import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ element, role }) => {
    const { auth } = useAuth();

    if (!auth.token) {
        return <Navigate to="/login" replace />;
    }

    if (role && auth.role !== role) {
        console.warn(`Role mismatch: expected ${role}, got ${auth.role}`);

        switch (auth.role) {
            case 'ADMIN':
                return <Navigate to="/admin" replace />;
            case 'CUSTOMER':
                return <Navigate to="/" replace />;
            default:
                return <Navigate to="/login" replace />;
        }
    }

    return element;
};

export default ProtectedRoute;
