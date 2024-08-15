import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Updated import
import '../assets/Home.css';
import image1 from '../images/solar1.jpg';

const Home = () => {
  const navigate = useNavigate(); // Updated to useNavigate

  const handleLoginRedirect = () => {
    navigate('/login'); // Updated to useNavigate
  };

  const handleSignupRedirect = () => {
    navigate('/signup'); // Updated to useNavigate
  };

  return (
    <Container fluid className="home-container">
      <Row className="navbar-row">
        <Col>
          <h1 className="brand-name">Eco-Sun Solutions</h1>
        </Col>
        <Col className="text-right navbar-buttons">
          <Button variant="outline-primary" className="auth-button" onClick={handleLoginRedirect}>
            Login
          </Button>
          <Button variant="outline-primary" className="auth-button" onClick={handleSignupRedirect}>
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
            <Button variant="primary" className="start-button" onClick={handleLoginRedirect}>
              Let's Start
            </Button>
          </div>
        </Col>
      </Row>
      <Row className="text-center footer-section">
        <Col>
          <p>This is my Home page</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
