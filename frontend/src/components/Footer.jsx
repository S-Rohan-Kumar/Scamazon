import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const footerStyle = {
  backgroundColor: '#f9f9f9',
  padding: '4rem 0 2rem',
  marginTop: '5rem',
  borderTop: '1px solid #eee',
  fontFamily: "'Inter', sans-serif"
};

const footerHeading = {
  fontSize: '0.9rem',
  fontWeight: '700',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  marginBottom: '1.5rem',
  color: '#111'
};

const footerLink = {
  display: 'block',
  color: '#666',
  textDecoration: 'none',
  fontSize: '0.9rem',
  marginBottom: '0.75rem',
  transition: 'color 0.2s'
};

function Footer() {
  const current_year = new Date().getFullYear();

  return (
    <footer style={footerStyle}>
      <Container>
        <Row className="gy-4">
          <Col md={4}>
            <h5 style={{ fontWeight: 800, letterSpacing: '-0.5px', marginBottom: '1rem' }}>SCAMAZON</h5>
            <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: '1.6', maxWidth: '300px' }}>
              Premium essentials designed for modern living. Quality and simplicity in every detail.
            </p>
          </Col>
          
          <Col sm={6} md={2}>
            <h6 style={footerHeading}>Shop</h6>
            <Link to="/" style={footerLink}>All Products</Link>
            <Link to="/" style={footerLink}>New Arrivals</Link>
            <Link to="/" style={footerLink}>Featured</Link>
          </Col>

          <Col sm={6} md={2}>
            <h6 style={footerHeading}>Support</h6>
            <Link to="/" style={footerLink}>Contact Us</Link>
            <Link to="/" style={footerLink}>Shipping</Link>
            <Link to="/" style={footerLink}>Returns</Link>
          </Col>

          <Col md={4} className="text-md-end">
            <h6 style={footerHeading}>Newsletter</h6>
            <p style={{ color: '#666', fontSize: '0.85rem' }}>Join for early access and updates.</p>
            <div className="d-flex justify-content-md-end">
                <input 
                    type="text" 
                    placeholder="Email" 
                    style={{ border: '1px solid #ddd', borderRadius: '4px 0 0 4px', padding: '0.4rem 0.8rem', fontSize: '0.85rem' }} 
                />
                <button style={{ background: '#111', color: '#fff', border: 'none', padding: '0.4rem 1rem', borderRadius: '0 4px 4px 0', fontSize: '0.85rem' }}>
                    Join
                </button>
            </div>
          </Col>
        </Row>
        
        <Row className="mt-5 pt-4 border-top">
          <Col className="text-center">
            <p style={{ color: '#999', fontSize: '0.8rem' }}>
              &copy; {current_year} Scamazon Inc. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;