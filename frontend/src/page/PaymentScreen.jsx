import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { FaArrowRight, FaWallet } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../slices/cartslice';
import CheckoutSteps from '../components/CheckoutSteps';

// Integrating your specific styles from CartScreen
const styles = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#fcfcfc',
    paddingTop: '5rem',
    paddingBottom: '5rem',
    fontFamily: "'Inter', sans-serif",
    color: '#1a1a1a',
  },
  heading: {
    fontWeight: 700,
    fontSize: '2rem',
    letterSpacing: '-0.03em',
    marginBottom: '2.5rem',
    textAlign: 'center'
  },
  paymentCard: {
    backgroundColor: '#111', // Your dark summary card color
    borderRadius: '24px',
    padding: '2.5rem',
    color: '#fff',
    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
  },
  optionBox: {
    border: '1px solid #333',
    borderRadius: '16px',
    padding: '1.5rem',
    marginBottom: '1.5rem',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    backgroundColor: '#1a1a1a',
  },
  activeOption: {
    borderColor: '#fff',
    backgroundColor: '#222',
  },
  checkoutBtn: {
    width: '100%',
    backgroundColor: '#fff', // White button like your summary
    color: '#111',
    border: 'none',
    borderRadius: '14px',
    padding: '1.1rem',
    fontWeight: 600,
    marginTop: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    transition: 'all 0.3s ease',
  }
};

const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState('PayPal');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  useEffect(() => {
    if (!shippingAddress || !shippingAddress.address) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  useEffect(() =>{
    if(!cart.cartItems || cart.cartItems.length===0){
      navigate('/')
    }
  },[navigate,cart])

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };

  return (
    <div style={styles.page}>
      <Container>
        <CheckoutSteps step1 step2 step3 />
        
        <h1 style={styles.heading}>Payment Method</h1>

        <Row className="justify-content-center mt-5">
          <Col md={6} lg={5}>
            <div style={styles.paymentCard}>
              <div className="d-flex align-items-center gap-3 mb-4">
                <FaWallet color="#999" size={20} />
                <h2 style={{ fontSize: '1.25rem', fontWeight: 600, margin: 0 }}>Select Gateway</h2>
              </div>

              <Form onSubmit={submitHandler}>
                <div 
                  style={{ 
                    ...styles.optionBox, 
                    ...(paymentMethod === 'PayPal' ? styles.activeOption : {}) 
                  }}
                  onClick={() => setPaymentMethod('PayPal')}
                >
                  <Form.Check
                    type="radio"
                    id="PayPal"
                    label="PayPal or Credit Card"
                    name="paymentMethod"
                    value="PayPal"
                    checked={paymentMethod === 'PayPal'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    style={{ fontWeight: 500, color: '#fff' }}
                  />
                  <div style={{ color: '#888', fontSize: '0.85rem', marginLeft: '1.6rem', marginTop: '0.5rem' }}>
                    Pay securely via Card, UPI, or Net Banking
                  </div>
                </div>

                <button 
                  type="submit" 
                  style={styles.checkoutBtn}
                  onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
                  onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                >
                  Continue <FaArrowRight size={14} />
                </button>
              </Form>

              <p className="text-center mt-4 mb-0" style={{ color: '#666', fontSize: '0.85rem' }}>
                Encrypted & Secure Payment Processing
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PaymentScreen;