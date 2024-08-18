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
  // const [transactionId, setTransactionId] = useState('');
  // const [paymentId, setPaymentId] = useState('');
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
    const now = new Date().toISOString();
    const newTransactionId = Math.random().toString(36).substr(2, 9); // Random transaction ID
    const newPaymentId = Math.random().toString(36).substr(2, 9); // Random payment ID

    axios.post('http://localhost:9292/orders', {
      orderId: 0,
      addressId: 1, // Replace with the actual address ID
      totalAmount: totalAmount,
      userId: auth.userId,
      paymentId: newPaymentId,
      orderDate: now,
      productIds: [selectedProduct.id],
      updatedOn: now,
    })
    .then(() => {
      return axios.post('http://localhost:9292/payments', {
        paymentId: newPaymentId,
        transactionId: newTransactionId,
        paymentMethod: paymentMethod,
        transactionDate: now,
        amount: totalAmount,
      });
    })
    .then(() => {
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
