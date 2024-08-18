import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/SelectAddress.css';

function SelectAddress() {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [newAddress, setNewAddress] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user's addresses
    axios.get(`http://localhost:9292/addresses`)
      .then((response) => {
        setAddresses(response.data);
      })
      .catch((error) => {
        console.error('Error fetching addresses:', error);
      });
  }, []);

  const handleProceedToPayment = () => {
    if (selectedAddress) {
      localStorage.setItem('selectedAddress', JSON.stringify(selectedAddress));
    } else {
      // Handle adding a new address logic here
      // For now, just simulate a new address being selected
      const newAddressObj = {
        addressId: Math.random(), // Simulated address ID
        address: newAddress
      };
      localStorage.setItem('selectedAddress', JSON.stringify(newAddressObj));
    }
    navigate('/payment');
  };

  return (
    <div className="select-address-container">
      <h2>Select or Add Address</h2>
      <div className="addresses-list">
        {addresses.map((address) => (
          <div key={address.addressId} className="address-item">
            <input
              type="radio"
              value={address.addressId}
              onChange={() => setSelectedAddress(address)}
            />
            <label>{address.address}</label>
          </div>
        ))}
      </div>
      <div className="new-address">
        <h3>Or Add New Address</h3>
        <input
          type="text"
          placeholder="Enter new address"
          value={newAddress}
          onChange={(e) => setNewAddress(e.target.value)}
        />
      </div>
      <button onClick={handleProceedToPayment} className="proceed-button">Proceed to Payment</button>
    </div>
  );
}

export default SelectAddress;
