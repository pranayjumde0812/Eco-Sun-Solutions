import React, { useState } from 'react';
import axios from 'axios';

function AddCategory() {
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleAddCategory = async () => {
    try {
      const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
      const category = { categoryName, categoryDescription };
      const response = await axios.post('http://localhost:9292/product-categories', category, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });
      setSuccessMessage('Category added successfully!');
      console.log('Category added:', response.data);
      
      // Reset form fields
      setCategoryName('');
      setCategoryDescription('');
    } catch (error) {
      if (error.response) {
        setErrorMessage(`Error: ${error.response.data.message || error.response.statusText}`);
        console.error('Error adding category:', error.response.data);
      } else if (error.request) {
        setErrorMessage('Error: No response received from the server.');
        console.error('Error adding category:', error.request);
      } else {
        setErrorMessage(`Error: ${error.message}`);
        console.error('Error adding category:', error.message);
      }
    }
  };
  

  return (
    <div className="container mt-5">
      <h2>Add Category</h2>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      <form>
        <div className="form-group">
          <label htmlFor="categoryName">Category Name</label>
          <input
            type="text"
            className="form-control"
            id="categoryName"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Enter category name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="categoryDescription">Category Description</label>
          <input
            type="text"
            className="form-control"
            id="categoryDescription"
            value={categoryDescription}
            onChange={(e) => setCategoryDescription(e.target.value)}
            placeholder="Enter category description"
          />
        </div>
        <button type="button" className="btn btn-primary mt-3" onClick={handleAddCategory}>
          Add Category
        </button>
      </form>
    </div>
  );
}

export default AddCategory;
