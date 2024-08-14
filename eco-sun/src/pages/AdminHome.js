import React from 'react';
import ImageCarousel from '../components/Carousel';

function AdminHome() {
  return (
    <div className="admin-home">
      <ImageCarousel />
      <div className="admin-section">
        <h2>Welcome, Admin</h2>
        <p>Manage your site through the navigation bar options.</p>
      </div>
    </div>
  );
}

export default AdminHome;
