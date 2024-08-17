import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Categories.css'; // Import the CSS file

function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:9292/product-categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Manage Categories</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Category Name</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.categoryId}>
              <td>{category.categoryId}</td>
              <td>{category.categoryName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Categories;
