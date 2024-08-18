import React from 'react';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="bg-dark text-light text-center text-lg-start">
      <div className="text-center p-3">
        <p>Contact Us: +1 234 567 890 | info@ecosun.com</p>
        <p>Follow Us: 
          <a href="#" className="footer-link">Facebook</a> | 
          <a href="#" className="footer-link">Twitter</a> | 
          <a href="#" className="footer-link">LinkedIn</a>
        </p>
        © 2024 ECO SUN Solutions. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
