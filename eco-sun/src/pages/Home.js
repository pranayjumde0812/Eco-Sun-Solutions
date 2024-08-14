import React from 'react';
import ImageCarousel from '../components/Carousel';

function Home() {
  return (
    <div className="home">
      <ImageCarousel />
      <div className="about-section">
        <h2>About Us</h2>
        <p>Your company description goes here.</p>
      </div>
    </div>
  );
}

export default Home;
