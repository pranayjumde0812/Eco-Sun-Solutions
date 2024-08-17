import React from 'react';
import { Carousel } from 'react-bootstrap';
import image1 from '../images/man-worker-firld-by-solar-panels.jpg'
import image2 from '../images/close-view-solar-panel.jpg'
function ImageCarousel() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={image1}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Solar Panel 1</h3>
          <p>Description for Solar Panel 1.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={image2}
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3>Solar Panel 2</h3>
          <p>Description for Solar Panel 2.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default ImageCarousel;
