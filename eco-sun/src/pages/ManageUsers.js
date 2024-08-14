import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:9292/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleDelete = async (userId) => {
    if (!userId) {
      console.error('User ID is undefined');
      return;
    }

    try {
      await axios.delete(`http://localhost:9292/users/${userId}`);
      fetchUsers(); // Refresh user list after deletion
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsEditing(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!selectedUser.firstName) newErrors.firstName = 'First name is required';
    if (!selectedUser.lastName) newErrors.lastName = 'Last name is required';
    if (!selectedUser.email) newErrors.email = 'Email is required';
    // Add other validations as needed
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    const userId = selectedUser?.userId;
    if (!userId) {
      console.error('User ID is undefined');
      return;
    }

    try {
      await axios.put(`http://localhost:9292/users/${userId}`, selectedUser);
      fetchUsers(); // Refresh user list after update
      setIsEditing(false);
      setSelectedUser(null);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Manage Users</h2>

      {isEditing && selectedUser && (
        <div className="mb-4">
          <h3>Edit User</h3>
          <form>
            <div className="form-group">
              <label>User ID</label>
              <input
                type="text"
                className="form-control"
                name="userId"
                value={selectedUser.userId}
                readOnly
              />
            </div>
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                className="form-control"
                name="firstName"
                value={selectedUser.firstName}
                onChange={handleFormChange}
              />
              {errors.firstName && <small className="text-danger">{errors.firstName}</small>}
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                className="form-control"
                name="lastName"
                value={selectedUser.lastName}
                onChange={handleFormChange}
              />
              {errors.lastName && <small className="text-danger">{errors.lastName}</small>}
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={selectedUser.email}
                onChange={handleFormChange}
              />
              {errors.email && <small className="text-danger">{errors.email}</small>}
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={selectedUser.password}
                onChange={handleFormChange}
              />
              {errors.password && <small className="text-danger">{errors.password}</small>}
            </div>
            <div className="form-group">
              <label>PAN Number</label>
              <input
                type="text"
                className="form-control"
                name="panNumber"
                value={selectedUser.panNumber}
                onChange={handleFormChange}
              />
            </div>
            <div className="form-group">
              <label>Aadhar Number</label>
              <input
                type="text"
                className="form-control"
                name="aadharNumber"
                value={selectedUser.aadharNumber}
                onChange={handleFormChange}
              />
            </div>
            <div className="form-group">
              <label>Mobile Number</label>
              <input
                type="text"
                className="form-control"
                name="mobileNumber"
                value={selectedUser.mobileNumber}
                onChange={handleFormChange}
              />
            </div>
            <button type="button" className="btn btn-primary" onClick={handleSave}>
              Save
            </button>
            <button type="button" className="btn btn-secondary ml-2" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </form>
        </div>
      )}

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.userId}>
              <td>{user.userId}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button className="btn btn-warning btn-sm" onClick={() => handleEdit(user)}>
                  Edit
                </button>
                <button className="btn btn-danger btn-sm ml-2" onClick={() => handleDelete(user.userId)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageUsers;
