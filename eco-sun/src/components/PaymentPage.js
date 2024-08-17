import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/PaymentPage.css';

function PaymentPage() {
  const [paymentDetails, setPaymentDetails] = useState({
    paymentId: '',
    transactionId: '',
    paymentMethod: '',
    transactionDate: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Generate unique transaction ID and payment ID
    setPaymentDetails({
      paymentId: `PAY_${Math.random().toString(36).substr(2, 9)}`,
      transactionId: `TXN_${Math.random().toString(36).substr(2, 9)}`,
      transactionDate: new Date().toISOString().split('T')[0], // Current date
    });
  }, []);

  const handleChange = (e) => {
    setPaymentDetails({ ...paymentDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call backend to save payment details
      const paymentResponse = await axios.post('http://localhost:9292/payment-details', paymentDetails);

      // Optionally, create an order in the backend
      await axios.post('http://localhost:9292/orders', {
        productId: 1, // Replace with actual product ID
        paymentId: paymentResponse.data.paymentId,
        // Other order details like customer ID, quantity, etc.
      });

      // Redirect to "My Orders" page
      navigate('/my-orders');
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  };

  return (
    <div className="payment-page-container">
      <h2>Complete Your Payment</h2>
      <form className="payment-form" onSubmit={handleSubmit}>
        <label>
          Payment Method:
          <select name="paymentMethod" value={paymentDetails.paymentMethod} onChange={handleChange} required>
            <option value="" disabled>Select Payment Method</option>
            <option value="CREDIT_CARD">Credit Card</option>
            <option value="DEBIT_CARD">Debit Card</option>
            <option value="BANK_TRANSFER">Bank Transfer</option>
            <option value="UPI">UPI</option>
            <option value="CHECK">Check</option>
            <option value="CASH">Cash</option>
            <option value="OTHER">Other</option>
          </select>
        </label>
        <button type="submit" className="pay-now-button">Pay Now</button>
      </form>
    </div>
  );
}

export default PaymentPage;
