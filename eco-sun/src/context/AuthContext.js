import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        token: localStorage.getItem('token'),
        user: localStorage.getItem('username'),
        role: localStorage.getItem('role'),
        userId: localStorage.getItem('userId'), // Ensure this line is here
    });

    const login = (token, user, role, userId, navigate) => {
        setAuth({ token, user, role, userId });
        localStorage.setItem('token', token);
        localStorage.setItem('username', user);
        localStorage.setItem('role', role);
        localStorage.setItem('userId', userId); // Ensure userId is stored

        if (role === 'ADMIN') {
            navigate('/admin', { replace: true });
        } else if (role === 'CUSTOMER') {
            navigate('/', { replace: true });
        }
    };

    const logout = (navigate) => {
        setAuth({ token: null, user: null, role: null, userId: null });
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('role');
        localStorage.removeItem('userId'); // Ensure userId is removed on logout
        navigate('/login', { replace: true });
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
