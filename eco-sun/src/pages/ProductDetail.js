import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Button, Form } from 'react-bootstrap';
import '../styles/ProductDetail.css';

function ProductDetail() {
  const { id } = useParams();
  const { auth } = useAuth();
  const [product, setProduct] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    addressType: 'RESIDENTIAL', // Default type
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:9292/products/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error('Error fetching product:', error);
      });

    if (auth.userId) {
      axios.get(`http://localhost:9292/addresses/user/${auth.userId}`)
        .then((response) => {
          setAddresses(response.data);
        })
        .catch((error) => {
          console.error('Error fetching addresses:', error);
        });
    }
  }, [id, auth.userId]);

  const handleBuyNow = () => {
    const userId = localStorage.getItem('userId'); // Fetch userId from local storage

    if (selectedAddress && userId) {
      localStorage.setItem('selectedProduct', JSON.stringify(product));
      localStorage.setItem('selectedAddress', selectedAddress);
      localStorage.setItem('userId', userId); // Ensure userId is stored in local storage
      navigate('/payment');
    } else {
      console.error('Missing required fields. Address or User ID is not set.');
    }
  };

  const handleAddressChange = (e) => {
    setSelectedAddress(e.target.value);
  };

  const handleNewAddressChange = (e) => {
    setNewAddress({
      ...newAddress,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddAddress = () => {
    const userId = localStorage.getItem('userId'); // Fetch userId from local storage

    if (newAddress.address.trim() && userId) {
      axios.post('http://localhost:9292/addresses', { ...newAddress, userId: userId })
        .then((response) => {
          setAddresses([...addresses, response.data]);
          setSelectedAddress(response.data.addressId);
          setNewAddress({
            address: '',
            city: '',
            state: '',
            postalCode: '',
            country: '',
            addressType: 'RESIDENTIAL', // Reset to default
          });
          setShowAddressForm(false);
        })
        .catch((error) => {
          console.error('Error adding address:', error);
        });
    }
  };

  const userId = localStorage.getItem('userId'); // Fetch userId from local storage

  return (
    <div className="product-detail-container">
      {product ? (
        <div className="product-detail">
          <div className="product-image">
            <img src={product.imageUrl || 'default-image.jpg'} alt={product.productName} />
          </div>
          <div className="product-info">
            <h1 className="product-name">{product.productName}</h1>
            <p className="product-description">{product.description}</p>
            <p className="product-price">Price: ${product.unitPrice.toFixed(2)}</p>

            <div className="user-id-field">
              <label>User ID:</label>
              <input
                type="text"
                value={userId || ''}
                readOnly
                className="user-id-input"
              />
            </div>

            <div className="address-selection">
              <h2>Select Address</h2>
              {addresses.length > 0 ? (
                <Form.Control
                  as="select"
                  value={selectedAddress}
                  onChange={handleAddressChange}
                  className="address-select"
                >
                  <option value="">Select an address</option>
                  {addresses.map((address) => (
                    <option key={address.addressId} value={address.addressId}>
                      {`${address.address}, ${address.city}, ${address.state}, ${address.postalCode}, ${address.country}`}
                    </option>
                  ))}
                </Form.Control>
              ) : (
                <p className="no-addresses">No addresses available. Please add a new address.</p>
              )}

              {showAddressForm && (
                <div className="address-form">
                  <h3>Add New Address</h3>
                  <Form.Control
                    type="text"
                    name="address"
                    value={newAddress.address}
                    onChange={handleNewAddressChange}
                    placeholder="Enter new address"
                    className="form-input"
                  />
                  <Form.Control
                    type="text"
                    name="city"
                    value={newAddress.city}
                    onChange={handleNewAddressChange}
                    placeholder="Enter city"
                    className="form-input"
                  />
                  <Form.Control
                    type="text"
                    name="state"
                    value={newAddress.state}
                    onChange={handleNewAddressChange}
                    placeholder="Enter state"
                    className="form-input"
                  />
                  <Form.Control
                    type="text"
                    name="postalCode"
                    value={newAddress.postalCode}
                    onChange={handleNewAddressChange}
                    placeholder="Enter postal code"
                    className="form-input"
                  />
                  <Form.Control
                    type="text"
                    name="country"
                    value={newAddress.country}
                    onChange={handleNewAddressChange}
                    placeholder="Enter country"
                    className="form-input"
                  />
                  <Form.Control
                    as="select"
                    name="addressType"
                    value={newAddress.addressType}
                    onChange={handleNewAddressChange}
                    className="form-select"
                  >
                    <option value="RESIDENTIAL">Residential</option>
                    <option value="BUSINESS">Business</option>
                    <option value="BILLING">Billing</option>
                    <option value="SHIPPING">Shipping</option>
                  </Form.Control>
                  <Button onClick={handleAddAddress} className="form-button" variant="primary">Add Address</Button>
                </div>
              )}

              {!showAddressForm && (
                <Button onClick={() => setShowAddressForm(true)} className="add-address-button" variant="info">Add New Address</Button>
              )}
            </div>

            <Button
              className="buy-now-button"
              onClick={handleBuyNow}
              disabled={!selectedAddress}
              variant="danger"
            >
              Buy Now
            </Button>
          </div>
        </div>
      ) : (
        <p className="loading-text">Loading...</p>
      )}
    </div>
  );
}

export default ProductDetail;
