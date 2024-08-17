import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ManageUsers.css'; // Import the CSS file

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isAdmin, setIsAdmin] = useState(false); // Determine if the user is an admin

  useEffect(() => {
    fetchUsers();
    checkIfAdmin();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
      const response = await axios.get('http://localhost:9292/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data); // Store the fetched users in state
    } catch (error) {
      if (error.response) {
        setErrorMessage(`Error: ${error.response.data.message || error.response.statusText}`);
        console.error('Error fetching users:', error.response.data);
      } else if (error.request) {
        setErrorMessage('Error: No response received from the server.');
        console.error('Error fetching users:', error.request);
      } else {
        setErrorMessage(`Error: ${error.message}`);
        console.error('Error fetching users:', error.message);
      }
    }
  };

  const checkIfAdmin = () => {
    const role = localStorage.getItem('role');
    setIsAdmin(role === 'ADMIN');
  };

  const handleDelete = async (userId) => {
    try {
      const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
      await axios.delete(`http://localhost:9292/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Refresh the user list after successful deletion
      fetchUsers();
    } catch (error) {
      setErrorMessage('Error deleting user.');
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Manage Users</h2>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      {/* Render users list */}
      {users.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Role</th>
              {isAdmin && <th>Actions</th>} {/* Show Actions column only for admin */}
            </tr>
          </thead>
          <tbody>
            {users
              .filter(user => user.role === 'CUSTOMER') // Filter to show only customers
              .map(user => (
                <tr key={user.userId}>
                  <td>{user.userId}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  {isAdmin && (
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(user.userId)}
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
}

export default ManageUsers;
