import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import '../styles/ProductDetail.css';

function ProductDetail() {
  const { id } = useParams();
  const { auth } = useAuth();
  const [product, setProduct] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState('');
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

    // Fetch user's addresses
    if (auth.userId) {
      axios.get(`http://localhost:9292/addresses/${auth.userId}`)
        .then((response) => {
          setAddresses(response.data);
        })
        .catch((error) => {
          console.error('Error fetching addresses:', error);
        });
    }
  }, [id, auth.userId]);

  const handleBuyNow = () => {
    if (selectedAddress) {
      localStorage.setItem('selectedProduct', JSON.stringify(product));
      navigate('/payment');
    } else {
      setShowAddressForm(true);
    }
  };

  const handleAddressChange = (e) => {
    setSelectedAddress(e.target.value);
  };

  const handleNewAddressChange = (e) => {
    setNewAddress(e.target.value);
  };

  const handleAddAddress = () => {
    if (newAddress.trim()) {
      axios.post(`http://localhost:9292/addresses`, { userId: auth.userId, address: newAddress })
        .then(() => {
          setAddresses([...addresses, newAddress]);
          setNewAddress('');
          setSelectedAddress(newAddress);
          setShowAddressForm(false);
        })
        .catch((error) => {
          console.error('Error adding address:', error);
        });
    }
  };

  return (
    <div className="product-detail-container">
      {product ? (
        <div className="product-detail">
          <h2 className="product-name">{product.productName}</h2>
          <p className="product-description">{product.description}</p>
          <p className="product-price">Price: ${product.unitPrice}</p>

          <div className="address-selection">
            <h3>Select Address</h3>
            {addresses.length > 0 ? (
              <select value={selectedAddress || ''} onChange={handleAddressChange}>
                <option value="">Select an address</option>
                {addresses.map((address, index) => (
                  <option key={index} value={address}>{address}</option>
                ))}
              </select>
            ) : (
              <p>No addresses available. Please add a new address.</p>
            )}

            {showAddressForm && (
              <div className="address-form">
                <input
                  type="text"
                  value={newAddress}
                  onChange={handleNewAddressChange}
                  placeholder="Enter new address"
                />
                <button onClick={handleAddAddress}>Add Address</button>
              </div>
            )}
          </div>

          <button className="buy-now-button" onClick={handleBuyNow}>Buy Now</button>
        </div>
      ) : (
        <p className="loading-text">Loading...</p>
      )}
    </div>
  );
}

export default ProductDetail;
