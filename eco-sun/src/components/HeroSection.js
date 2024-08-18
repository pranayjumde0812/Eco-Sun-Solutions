import React from 'react';
import { Carousel } from 'react-bootstrap';
import '../styles/HeroSection.css';
import bgImage from '../images/solar-panels-roof-solar-cell.jpg';
import bgImage1 from '../images/close-view-solar-panel.jpg';
import bgImage2 from '../images/man-worker-firld-by-solar-panels.jpg';

function HeroSection() {
  return (
    <div className="hero-section">
      <Carousel controls={false} indicators={false} interval={5000} fade={true}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={bgImage}
            alt="Solar Panel Installation"
          />
          <Carousel.Caption>
            <h3>Reliable Solar Energy Solutions</h3>
            <p>Harness the power of the sun with our top-of-the-line solar panels and energy solutions.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={bgImage1}
            alt="High Efficiency Panels"
          />
          <Carousel.Caption>
            <h3>High Efficiency Panels</h3>
            <p>Our solar panels are engineered for peak efficiency to help you save more on your energy bills.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={bgImage2}
            alt="Eco-Friendly Energy"
          />
          <Carousel.Caption>
            <h3>Eco-Friendly Energy</h3>
            <p>Commit to a sustainable future with eco-friendly solar energy that benefits both you and the planet.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default HeroSection;
