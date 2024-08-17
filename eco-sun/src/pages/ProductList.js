import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/ProductList.css'; // Import the CSS file

function ProductList() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  // Fetch products and categories when the component mounts
  useEffect(() => {
    axios.get('http://localhost:9292/products')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });

    axios.get('http://localhost:9292/product-categories')
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  // Handle category selection change
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // Filter products based on the selected category
  const filteredProducts = selectedCategory
    ? products.filter((product) => 
        product.categoryId && product.categoryId.toString() === selectedCategory
      )
    : products;

  return (
    <div className="product-list-container">
      <h2>Products</h2>
      <div className="filter-container">
        <label htmlFor="categoryFilter">Filter by Category:</label>
        <select id="categoryFilter" onChange={handleCategoryChange} value={selectedCategory}>
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.categoryId} value={category.categoryId}>
              {category.categoryName}
            </option>
          ))}
        </select>
      </div>
      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.productId} className="product-card">
              <img src={product.imageUrl} alt={product.productName} />
              <h3>{product.productName}</h3>
              <p>Price: ${product.unitPrice}</p>
              <Link to={`/products/${product.productId}`}>View Details</Link>
            </div>
          ))
        ) : (
          <p>No products found for the selected category.</p>
        )}
      </div>
    </div>
  );
}

export default ProductList;
