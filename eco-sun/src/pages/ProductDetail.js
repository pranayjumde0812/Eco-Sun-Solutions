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
    if (selectedAddress) {
      localStorage.setItem('selectedProduct', JSON.stringify(product));
      localStorage.setItem('selectedAddress', selectedAddress);
      navigate('/payment');
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
    if (newAddress.address.trim()) {
      axios.post(`http://localhost:9292/addresses`, { ...newAddress, userId: auth.userId })
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
              <select value={selectedAddress} onChange={handleAddressChange}>
                <option value="">Select an address</option>
                {addresses.map((address) => (
                  <option key={address.addressId} value={address.addressId}>
                    {`${address.address}, ${address.city}, ${address.state}, ${address.postalCode}, ${address.country}`}
                  </option>
                ))}
              </select>
            ) : (
              <p>No addresses available. Please add a new address.</p>
            )}

            {showAddressForm && (
              <div className="address-form">
                <input
                  type="text"
                  name="address"
                  value={newAddress.address}
                  onChange={handleNewAddressChange}
                  placeholder="Enter new address"
                />
                <input
                  type="text"
                  name="city"
                  value={newAddress.city}
                  onChange={handleNewAddressChange}
                  placeholder="Enter city"
                />
                <input
                  type="text"
                  name="state"
                  value={newAddress.state}
                  onChange={handleNewAddressChange}
                  placeholder="Enter state"
                />
                <input
                  type="text"
                  name="postalCode"
                  value={newAddress.postalCode}
                  onChange={handleNewAddressChange}
                  placeholder="Enter postal code"
                />
                <input
                  type="text"
                  name="country"
                  value={newAddress.country}
                  onChange={handleNewAddressChange}
                  placeholder="Enter country"
                />
                <select
                  name="addressType"
                  value={newAddress.addressType}
                  onChange={handleNewAddressChange}
                >
                  <option value="RESIDENTIAL">Residential</option>
                  <option value="BUSINESS">Business</option>
                  <option value="BILLING">Billing</option>
                  <option value="SHIPPING">Shipping</option>
                </select>
                <button onClick={handleAddAddress}>Add Address</button>
              </div>
            )}

            {!showAddressForm && (
              <button onClick={() => setShowAddressForm(true)}>Add New Address</button>
            )}
          </div>

          <button
            className="buy-now-button"
            onClick={handleBuyNow}
            disabled={!selectedAddress}
          >
            Buy Now
          </button>
        </div>
      ) : (
        <p className="loading-text">Loading...</p>
      )}
    </div>
  );
}

export default ProductDetail;
