import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        token: localStorage.getItem('token'),
        user: localStorage.getItem('username'),
        role: localStorage.getItem('role'),
    });

    const login = (token, user, role, navigate) => {
        setAuth({ token, user, role });
        localStorage.setItem('token', token);
        localStorage.setItem('username', user);
        localStorage.setItem('role', role);

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
        setAuth({ token: null, user: null, role: null });
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('role');
        navigate('/login', { replace: true });
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
