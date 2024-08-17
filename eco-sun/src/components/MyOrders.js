import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/MyOrders.css';

function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders for the logged-in customer
    axios.get('http://localhost:9292/orders') // Adjust the endpoint to filter orders by customer if needed
      .then(response => {
        setOrders(response.data);
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
      });
  }, []);

  return (
    <div className="my-orders-container">
      <h2>My Orders</h2>
      <ul className="orders-list">
        {orders.map(order => (
          <li key={order.id} className="order-item">
            <p>Order ID: {order.id}</p>
            <p>Product ID: {order.productId}</p>
            <p>Payment ID: {order.paymentId}</p>
            <p>Order Date: {order.orderDate}</p>
            {/* Display other order details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyOrders;
