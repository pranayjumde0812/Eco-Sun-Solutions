import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/PaymentPage.css';

function PaymentPage() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const product = JSON.parse(localStorage.getItem('selectedProduct'));
    if (product) {
      setSelectedProduct(product);
      setTotalAmount(product.unitPrice);
    } else {
      navigate('/products');
    }
  }, [navigate]);

  const handlePayment = () => {
    const selectedAddress = localStorage.getItem('selectedAddress');
    const userId = auth.userId;  // Get userId from auth context
    
    // Generate random transactionId and paymentId
    const transactionId = Math.random().toString(36).substr(2, 9);
    const paymentId = Math.random().toString(36).substr(2, 9);
    
    const now = new Date().toISOString();
    const orderData = {
      addressId: selectedAddress,
      totalAmount: selectedProduct.unitPrice,
      userId: userId,  // Include userId here
      paymentId: paymentId,
      orderDate: now.split('T')[0],
      productIds: [selectedProduct.productId],
      updatedOn: now.split('T')[0],
    };
  
    console.log('Order Data:', orderData);
  
    axios.post('http://localhost:9292/orders', orderData)
      .then((response) => {
        console.log('Order placed successfully:', response.data);
  
        // Now create the payment entry
        const paymentData = {
          paymentId: paymentId,
          transactionId: transactionId,
          paymentMethod: paymentMethod,
          transactionDate: now.split('T')[0],
        };
  
        console.log('Payment Data:', paymentData);
  
        return axios.post('http://localhost:9292/payments', paymentData);
      })
      .then((response) => {
        console.log('Payment recorded successfully:', response.data);
        localStorage.removeItem('selectedProduct');
        navigate('/my-orders');
      })
      .catch((error) => {
        console.error('Error processing payment:', error);
      });
  };
  
  return (
    <div className="payment-page-container">
      <h2>Payment Details</h2>
      <div className="payment-info">
        <p>Product: {selectedProduct?.productName}</p>
        <p>Price: ${selectedProduct?.unitPrice}</p>
        <p>Total Amount: ${totalAmount}</p>
        <label>Payment Method:</label>
        <input
          type="text"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          placeholder="Enter payment method"
        />
        <button onClick={handlePayment}>Pay Now</button>
      </div>
    </div>
  );
}

export default PaymentPage;
