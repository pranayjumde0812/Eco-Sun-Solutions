import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';

function Navbar() {
  const { user, setUser } = useContext(UserContext);

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">ECO SUN Solutions</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ml-auto">
          {user ? (
            <>
              {user.role === 'admin' && (
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
              <li className="nav-item">
                <Link className="nav-link" to="/contact">Contact Us</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/" onClick={handleLogout}>Logout</Link>
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
