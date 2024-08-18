import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';

function Navbar() {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    logout(navigate);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
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
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/products">Products</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/orders">My Orders</Link>
                  </li>
                </>
              )}
              {/* <li className="nav-item">
                <Link className="nav-link" to="/contact">Contact Us</Link>
              </li> */}
              <li className="nav-item">
                <Link className="nav-link" to="/about-us">About Us</Link>
              </li>
              <li className="nav-item dropdown">
                <span className="nav-link dropdown-toggle">
                  {auth.user}
                </span>
                <div className="dropdown-menu">
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
