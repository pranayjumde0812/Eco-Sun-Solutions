import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import '../styles/PaymentPage.css';

function PaymentPage() {
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
    const userId = localStorage.getItem('userId');

    if (!userId) {
      console.error('User ID not found in local storage');
      return;
    }

    // Generate random transactionId and paymentId
    const transactionId = Math.random().toString(36).substr(2, 9);
    const paymentId = Math.random().toString(36).substr(2, 9);

    const now = new Date().toISOString();
    const orderData = {
      addressId: parseInt(selectedAddress), // Ensure addressId is a number
      totalAmount: selectedProduct.unitPrice,
      userId: parseInt(userId),  // Ensure userId is a number
      paymentId: paymentId, // Keep as string if backend expects string
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
          paymentId: paymentId, // Keep as string if backend expects string
          transactionId: transactionId, // Keep as string if backend expects string
          paymentMethod: paymentMethod,
          transactionDate: now.split('T')[0],
          orderId: response.data.orderId,
        };

        axios.post('http://localhost:9292/payments', paymentData)
          .then(() => {
            localStorage.removeItem('selectedProduct');
            localStorage.removeItem('selectedAddress');
            navigate('/my-orders');
          })
          .catch((error) => {
            console.error('Error creating payment entry:', error.response?.data || error.message);
          });
      })
      .catch((error) => {
        console.error('Error placing order:', error.response?.data || error.message);
      });
  };

  return (
    <Container className="payment-page" fluid>
      {selectedProduct && (
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="payment-card">
              <Card.Body>
                <Card.Title className="text-center mb-4">Payment Details</Card.Title>
                <Card.Text>
                  <div className="product-info">
                    <h4 className="product-name">{selectedProduct.productName}</h4>
                    <p className="product-price">Total Amount: <span>${totalAmount.toFixed(2)}</span></p>
                  </div>
                </Card.Text>
                <Form>
                  <Form.Group controlId="formPaymentMethod">
                    <Form.Label>Payment Method:</Form.Label>
                    <Form.Control
                      type="text"
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      placeholder="Enter payment method"
                    />
                  </Form.Group>
                  <Button variant="primary" onClick={handlePayment} className="mt-3 w-100">
                    Pay Now
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default PaymentPage;
