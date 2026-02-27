// components/CheckoutSteps.jsx
import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  const linkStyle = (active) => ({
    color: active ? '#000' : '#ccc',
    fontWeight: active ? '900' : '400',
    textTransform: 'uppercase',
    fontSize: '0.75rem',
    letterSpacing: '1px',
    borderBottom: active ? '2px solid #000' : '2px solid transparent',
    paddingBottom: '5px'
  });

  return (
    <Nav className='justify-content-center mb-4'>
      <Nav.Item>
        {step1 ? (
          <LinkContainer to='/login'><Nav.Link style={linkStyle(true)}>Sign In</Nav.Link></LinkContainer>
        ) : (
          <Nav.Link disabled style={linkStyle(false)}>Sign In</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step2 ? (
          <LinkContainer to='/shipping'><Nav.Link style={linkStyle(true)}>Shipping</Nav.Link></LinkContainer>
        ) : (
          <Nav.Link disabled style={linkStyle(false)}>Shipping</Nav.Link>
        )}
      </Nav.Item>
      
      {/* ... repeat for step3 (Payment) and step4 (Place Order) */}
    </Nav>
  );
};

export default CheckoutSteps;