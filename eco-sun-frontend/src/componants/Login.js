import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../assets/Login.css';
import image1 from '../images/solar1.jpg';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic here
  };

  const handleSignupRedirect = () => {
    navigate('/signup');
  };

  return (
    <Container fluid className="login-container">
      <Row className="navbar-row">
        <Col>
          <h1 className="brand-name">Eco-Sun Solutions</h1>
        </Col>
        <Col className="navbar-buttons">
          <Button variant="outline-primary" className="auth-button custom-auth-button" onClick={handleSignupRedirect}>
            Signup
          </Button>
        </Col>
      </Row>
      <Row className="photo-section text-center">
        <Col className="image-container">
          <img
            src={image1}
            alt="Solar System"
            className="solar-image"
          />
          <div className="overlay">
            <h2>Login to Your Account</h2>
            <Form onSubmit={handleLogin} className="login-form">
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>

              <Button variant="primary" type="submit" className="start-button custom-auth-button">
                Login
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
      <Row className="text-center footer-section">
        <Col>
          <p>© 2024 Eco-Sun Solutions. All Rights Reserved.</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
