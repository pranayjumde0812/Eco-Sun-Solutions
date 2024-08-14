import React, { useState } from 'react';
import axios from 'axios';

function AddCategory() {
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleAddCategory = async () => {
    try {
      const category = { categoryName, categoryDescription };
      const response = await axios.post('http://localhost:9292/product-categories', category);
      setSuccessMessage('Category added successfully!');
      console.log('Category added:', response.data);
      
      // Reset form fields
      setCategoryName('');
      setCategoryDescription('');
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 2xx
        setErrorMessage(`Error: ${error.response.data.message || error.response.statusText}`);
        console.error('Error adding category:', error.response.data);
      } else if (error.request) {
        // Request was made but no response was received
        setErrorMessage('Error: No response received from the server.');
        console.error('Error adding category:', error.request);
      } else {
        // Something else caused the error
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
