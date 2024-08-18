import React from 'react';
import '../styles/AboutUs.css'; // Ensure this path is correct
import aboutUsImg from '../images/photovoltaic-solar-power-panel-field-green-clean-alternative-power-energy-concept-ai-generative (1).jpg';
import aboutUsImg2 from '../images/innovative-solar-panel-farm-generates-clean-renewable-electricity-generated-by-ai.jpg';
import aboutUsImg3 from '../images/aerial-view-private-house-with-solar-panels-roof.jpg'

function AboutUs() {
  return (
    <div className="about-us">
      <h1>About Us</h1>
      <p>We are committed to providing top-notch solar energy solutions that meet your needs. Our expert team is dedicated to delivering high-quality products and services to help you harness the power of the sun efficiently.</p>
      
      <div className="about-us-content">
        <div className="about-us-image">
          <img src={aboutUsImg} alt="Solar Energy 1" />
        </div>
        <div className="about-us-text">
          <h2>Our Vision</h2>
          <p>Our vision is to drive the transition to a sustainable future through cutting-edge solar technology and outstanding customer service. We aim to be the leading provider of renewable energy solutions, making solar power accessible to all.</p>
        </div>
      </div>
      
      <div className="about-us-content">
        <div className="about-us-text">
          <h2>Our Mission</h2>
          <p>We are dedicated to helping individuals and businesses reduce their carbon footprint and lower their energy costs. Our mission is to provide high-efficiency solar panels, expert installation, and continuous support to ensure optimal performance and satisfaction.</p>
        </div>
        <div className="about-us-image">
          <img src={aboutUsImg2} alt="Solar Energy 2" />
        </div>
      </div>
      
      <div className="about-us-content">
        <div className="about-us-text">
          <h2>Why Choose Us?</h2>
          <p>With our extensive experience in the solar industry, we offer unparalleled expertise and a commitment to excellence. We utilize the latest technologies and practices to ensure the best results for our clients. Our goal is to deliver exceptional value and make the solar energy transition as smooth as possible.</p>
        </div>
        <div className="about-us-image">
          {/* Add another image if desired */}
          <img src={aboutUsImg3} alt="Additional Solar Energy" />
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
