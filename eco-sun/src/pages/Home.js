import React from 'react';
import HeroSection from '../components/HeroSection'; // Re-import HeroSection
import '../styles/Home.css';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import solarImage1 from '../images/bubls-drawn-solar-panel.jpg';
import solarImage2 from '../images/plants-growing-light-bulb-nature-background.jpg';
import solarImage3 from '../images/man-with-white-helmet-near-solar-panel.jpg';
import solarImage4 from '../images/man-worker-firld-by-solar-panels (1).jpg';

function Home() {
  return (
    <div className="home">
      <HeroSection /> {/* Ensure HeroSection is included */}
      <div className="solar-info-section">
        <h2>Why Choose Solar Energy?</h2>
        <Row>
          <Col md={6} lg={3}>
            <Card className="solar-card">
              <Card.Img variant="top" src={solarImage1} alt="Solar Panel Efficiency" />
              <Card.Body>
                <Card.Title>Maximize Efficiency</Card.Title>
                <Card.Text>
                  Our solar panels are designed to maximize efficiency, ensuring you get the most energy out of every ray of sunlight. With advanced technology, you can expect superior performance and durability.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={3}>
            <Card className="solar-card">
              <Card.Img variant="top" src={solarImage2} alt="Sustainable Energy" />
              <Card.Body>
                <Card.Title>Sustainable Energy Solutions</Card.Title>
                <Card.Text>
                  Embrace sustainable energy with our cutting-edge solar solutions. Reduce your carbon footprint and contribute to a greener planet while saving on your electricity bills.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={3}>
            <Card className="solar-card">
              <Card.Img variant="top" src={solarImage3} alt="Professional Installation" />
              <Card.Body>
                <Card.Title>Professional Installation</Card.Title>
                <Card.Text>
                  Our expert team provides professional installation services to ensure your solar system is set up correctly and efficiently. We handle everything from start to finish, so you can enjoy hassle-free energy.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={3}>
            <Card className="solar-card">
              <Card.Img variant="top" src={solarImage4} alt="Maintenance Services" />
              <Card.Body>
                <Card.Title>Reliable Maintenance</Card.Title>
                <Card.Text>
                  Keep your solar system in top shape with our reliable maintenance services. We offer regular check-ups and quick resolutions to ensure your system performs optimally throughout its lifespan.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Home;
