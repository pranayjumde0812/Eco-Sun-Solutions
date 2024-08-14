import React from 'react';
import { Carousel } from 'react-bootstrap';

function ImageCarousel() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="your-image-path-1.jpg"
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
          src="your-image-path-2.jpg"
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
