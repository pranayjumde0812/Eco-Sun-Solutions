import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';  // Import the custom hook

function Navbar() {
  const { auth, logout } = useAuth();  // Use the custom hook to access context values
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    logout(navigate);
  };

  const toggleLogoutMenu = () => {
    setShowLogout(!showLogout);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">ECO SUN Solutions</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ml-auto">
          {auth.token ? (
            <>
              {auth.role === 'ADMIN' && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/categories">Categories</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/add-category">Add Category</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/add-product">Add Product</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/manage-users">Manage Users</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/orders">Orders</Link>
                  </li>
                </>
              )}
              {auth.role === 'CUSTOMER' && (
                <li className="nav-item">
                  <Link className="nav-link" to="/orders">Orders</Link>
                </li>
              )}
              <li className="nav-item">
                <Link className="nav-link" to="/contact">Contact Us</Link>
              </li>
              <li className="nav-item dropdown">
                <span className="nav-link dropdown-toggle" onClick={toggleLogoutMenu}>
                  {auth.user}
                </span>
                <div className={`dropdown-menu${showLogout ? ' show' : ''}`} aria-labelledby="dropdownMenuButton">
                  <button className="dropdown-item" onClick={handleLogoutClick}>Logout</button>
                </div>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/signup">Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
