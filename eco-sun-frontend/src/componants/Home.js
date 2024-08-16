import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../assets/Home.css';
import image1 from '../images/solar1.jpg';

const Home = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  const handleSignupRedirect = () => {
    navigate('/signup');
  };

  return (
    <Container fluid className="home-container">
      <Row className="navbar-row">
        <Col>
          <h1 className="brand-name">Eco-Sun Solutions</h1>
        </Col>
        <Col className="navbar-buttons">
          <Button variant="outline-primary" className="auth-button custom-auth-button" onClick={handleLoginRedirect}>
            Login
          </Button>
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
            <h2>Welcome To Eco-Sun Solutions</h2>
            <Button variant="primary" className="start-button custom-auth-button" onClick={handleLoginRedirect}>
              Let's Start
            </Button>
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

export default Home;
