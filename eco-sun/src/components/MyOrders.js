import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';
import '../styles/MyOrders.css';

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const customerId = 3; // Replace with actual logged-in customer ID logic

  useEffect(() => {
    // Fetch orders for the logged-in customer
    axios.get(`http://localhost:9292/orders/orders?customerId=${customerId}`)
      .then(response => {
        setOrders(response.data);
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
      });
  }, [customerId]);

  return (
    <Container fluid className="my-orders-container">
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <h2 className="text-center mb-4">My Orders</h2>
          {orders.length > 0 ? (
            <div className="orders-list">
              {orders.map(order => (
                <Card key={order.orderId} className="order-card mb-3">
                  <Card.Body>
                    <Card.Title>Order ID: {order.orderId}</Card.Title>
                    <Card.Text>
                      <p><strong>Address ID:</strong> {order.addressId}</p>
                      <p><strong>Payment ID:</strong> {order.paymentId}</p>
                      <p><strong>Order Date:</strong> {order.orderDate}</p>
                      {/* Display other order details as needed */}
                    </Card.Text>
                  </Card.Body>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-center">No orders found.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default MyOrders;
