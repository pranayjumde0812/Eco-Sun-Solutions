import React from 'react';
import '../styles/AboutUs.css'; // Create this CSS file
import aboutUsImg from '../images/photovoltaic-solar-power-panel-field-green-clean-alternative-power-energy-concept-ai-generative (1).jpg'
import aboutUsImg2 from '../images/innovative-solar-panel-farm-generates-clean-renewable-electricity-generated-by-ai.jpg'

function AboutUs() {
  return (
    <div className="about-us">
      <h1>About Us</h1>
      <p>We are dedicated to providing top-notch solar energy solutions to meet your needs. Our team of experts is committed to delivering high-quality products and services to help you harness the power of the sun.</p>
      <div className="about-us-content">
        <div className="about-us-image">
          <img src={aboutUsImg} alt="Solar Energy 1" />
        </div>
        <div className="about-us-text">
          <h2>Our Vision</h2>
          <p>Our vision is to create a sustainable future through innovative solar technology and exceptional customer service. We aim to lead the way in renewable energy solutions and make solar power accessible to everyone.</p>
        </div>
      </div>
      <div className="about-us-content">
        <div className="about-us-text">
          <h2>Our Mission</h2>
          <p>Our mission is to empower individuals and businesses to reduce their carbon footprint and lower their energy costs. We achieve this by providing high-efficiency solar panels, expert installation, and ongoing support.</p>
        </div>
        <div className="about-us-image">
          <img src={aboutUsImg2} alt="Solar Energy 2" />
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
