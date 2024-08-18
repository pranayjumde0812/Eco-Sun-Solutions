// import React, { createContext, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [auth, setAuth] = useState({ token: null, role: null, userId: null });
//   const navigate = useNavigate();

//   const login = (token, username, role) => {
//     setAuth({ token, username, role, userId: localStorage.getItem('userId') });
//     if (role === 'ADMIN') {
//       navigate('/admin');
//     } else {
//       navigate('/');
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ auth, login }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
