import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import '../styles/ProductList.css'; // Import the CSS file
import solarImg from '../images/2303.w019.n002.872B.p15.872.jpg'

function ProductList() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  // Fetch products and categories when the component mounts
  useEffect(() => {
    axios.get('http://localhost:9292/products')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });

    axios.get('http://localhost:9292/product-categories')
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  // Handle category selection change
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // Filter products based on the selected category
  const filteredProducts = selectedCategory
    ? products.filter((product) => 
        product.categoryId && product.categoryId.toString() === selectedCategory
      )
    : products;

  return (
    <Container fluid className="product-list-container">
      <Row className="justify-content-center">
        <Col md={10} lg={8} className="text-center">
          <h2 className="page-title">Our Exclusive Products</h2>
          <Form.Group controlId="categoryFilter" className="filter-container">
            <Form.Label>Filter by Category:</Form.Label>
            <Form.Control 
              as="select" 
              onChange={handleCategoryChange} 
              value={selectedCategory}
              className="category-select"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category.categoryId} value={category.categoryId.toString()}>
                  {category.categoryName}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Col key={product.productId} md={6} lg={4} xl={3} className="mb-4">
              <Card className="product-card">
                <Card.Img variant="top" src={solarImg} alt={product.productName} />
                <Card.Body>
                  <Card.Title>{product.productName}</Card.Title>
                  <Card.Text>
                    <strong>Price:</strong> ${product.unitPrice}
                  </Card.Text>
                  <Link to={`/products/${product.productId}`} className="btn btn-primary">
                    View Details
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col className="text-center">
            <p className="no-products">No products found for the selected category.</p>
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default ProductList;
