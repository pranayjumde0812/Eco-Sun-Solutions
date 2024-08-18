import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        token: localStorage.getItem('token'),
        user: localStorage.getItem('username'),
        role: localStorage.getItem('role'),
        userId: localStorage.getItem('userId'), // Add userId here
    });

    const login = (token, user, role, userId, navigate) => {  // Include userId in login function
        setAuth({ token, user, role, userId });
        localStorage.setItem('token', token);
        localStorage.setItem('username', user);
        localStorage.setItem('role', role);
        localStorage.setItem('userId', userId); // Store userId in localStorage

        if (role === 'ADMIN') {
            navigate('/admin', { replace: true });
        } else if (role === 'CUSTOMER') {
            navigate('/', { replace: true });
        } else {
            console.warn(`Unknown role: ${role}`);
            navigate('/login', { replace: true });
        }
    };

    const logout = (navigate) => {
        setAuth({ token: null, user: null, role: null, userId: null });
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('role');
        localStorage.removeItem('userId'); // Remove userId from localStorage
        navigate('/login', { replace: true });
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
