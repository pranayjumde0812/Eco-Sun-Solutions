import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/ProductDetail.css'; // Import the CSS file

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch product details by ID
    axios.get(`http://localhost:9292/products/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error('Error fetching product:', error);
      });
  }, [id]);

  const handleBuyNow = () => {
    // Save product details in local storage or context if needed
    // You might want to save product ID to retrieve it on the payment page
    localStorage.setItem('selectedProduct', JSON.stringify(product));
    // Redirect to the custom payment page
    navigate('/payment');
  };

  return (
    <div className="product-detail-container">
      {product ? (
        <div className="product-detail">
          <h2 className="product-name">{product.productName}</h2>
          <p className="product-description">{product.description}</p>
          <p className="product-price">Price: ${product.unitPrice}</p>
          <button className="buy-now-button" onClick={handleBuyNow}>Buy Now</button>
        </div>
      ) : (
        <p className="loading-text">Loading...</p>
      )}
    </div>
  );
}

export default ProductDetail;
