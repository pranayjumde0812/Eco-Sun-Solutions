import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddProduct() {
  const [productName, setProductName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [description, setDescription] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [wattage, setWattage] = useState('');
  const [ampere, setAmpere] = useState('');
  const [weight, setWeight] = useState('');
  const [efficiency, setEfficiency] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [dimensions, setDimensions] = useState('');
  const [rating, setRating] = useState('');
  const [categories, setCategories] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:9292/product-categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setErrorMessage('Failed to load categories.');
    }
  };

  const handleAddProduct = async () => {
    try {
      // Construct the product object with all required fields
      const product = {
        productName,
        categoryId: parseInt(categoryId),  // Ensure this is an integer
        description,
        manufacturer,
        wattage: parseFloat(wattage),
        ampere: parseFloat(ampere),
        weight: parseFloat(weight),
        efficiency: parseFloat(efficiency),
        unitPrice: parseFloat(unitPrice),
        dimensions,
        rating: parseFloat(rating)
      };

      // Log product object to ensure data is correct before making the request
      console.log('Adding product:', product);

      const response = await axios.post('http://localhost:9292/products', product);
      console.log('Product added:', response.data);
      setSuccessMessage('Product added successfully!');

      // Reset form fields
      setProductName('');
      setCategoryId('');
      setDescription('');
      setManufacturer('');
      setWattage('');
      setAmpere('');
      setWeight('');
      setEfficiency('');
      setUnitPrice('');
      setDimensions('');
      setRating('');
    } catch (error) {
      if (error.response) {
        setErrorMessage(`Error: ${error.response.data.message || error.response.statusText}`);
        console.error('Error adding product:', error.response.data);
      } else if (error.request) {
        setErrorMessage('Error: No response received from the server.');
        console.error('Error adding product:', error.request);
      } else {
        setErrorMessage(`Error: ${error.message}`);
        console.error('Error adding product:', error.message);
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add Product</h2>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      <form>
        <div className="form-group">
          <label htmlFor="productName">Product Name</label>
          <input
            type="text"
            className="form-control"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Enter product name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            className="form-control"
            id="category"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.categoryId} value={category.categoryId}>
                {category.categoryName} {/* Displaying category name instead of ID */}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter product description"
          />
        </div>
        <div className="form-group">
          <label htmlFor="manufacturer">Manufacturer</label>
          <input
            type="text"
            className="form-control"
            id="manufacturer"
            value={manufacturer}
            onChange={(e) => setManufacturer(e.target.value)}
            placeholder="Enter manufacturer name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="wattage">Wattage</label>
          <input
            type="number"
            className="form-control"
            id="wattage"
            value={wattage}
            onChange={(e) => setWattage(e.target.value)}
            placeholder="Enter wattage"
          />
        </div>
        <div className="form-group">
          <label htmlFor="ampere">Ampere</label>
          <input
            type="number"
            className="form-control"
            id="ampere"
            value={ampere}
            onChange={(e) => setAmpere(e.target.value)}
            placeholder="Enter ampere"
          />
        </div>
        <div className="form-group">
          <label htmlFor="weight">Weight</label>
          <input
            type="number"
            className="form-control"
            id="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Enter weight"
          />
        </div>
        <div className="form-group">
          <label htmlFor="efficiency">Efficiency</label>
          <input
            type="number"
            className="form-control"
            id="efficiency"
            value={efficiency}
            onChange={(e) => setEfficiency(e.target.value)}
            placeholder="Enter efficiency"
          />
        </div>
        <div className="form-group">
          <label htmlFor="unitPrice">Unit Price</label>
          <input
            type="number"
            className="form-control"
            id="unitPrice"
            value={unitPrice}
            onChange={(e) => setUnitPrice(e.target.value)}
            placeholder="Enter unit price"
          />
        </div>
        <div className="form-group">
          <label htmlFor="dimensions">Dimensions</label>
          <input
            type="text"
            className="form-control"
            id="dimensions"
            value={dimensions}
            onChange={(e) => setDimensions(e.target.value)}
            placeholder="Enter dimensions"
          />
        </div>
        <div className="form-group">
          <label htmlFor="rating">Rating</label>
          <input
            type="number"
            className="form-control"
            id="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            placeholder="Enter rating"
          />
        </div>
        <button type="button" className="btn btn-primary mt-3" onClick={handleAddProduct}>
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
