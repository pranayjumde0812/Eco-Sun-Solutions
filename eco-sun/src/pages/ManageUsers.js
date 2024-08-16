import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchUsers();
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

  return (
    <div className="container mt-5">
      <h2>Manage Users</h2>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      
      {/* Render users list */}
      {users.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.userId}>
                <td>{user.userId}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
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
