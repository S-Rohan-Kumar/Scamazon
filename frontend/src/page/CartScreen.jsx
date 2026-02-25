import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Row, Col, Image, Form, Container } from 'react-bootstrap';
import { FaShoppingBag, FaArrowRight, FaTrashAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addTocart, removeFromCart } from '../slices/cartslice.js';

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
  },
  itemCard: {
    backgroundColor: '#fff',
    borderRadius: '16px',
    padding: '1.5rem',
    marginBottom: '1rem',
    border: '1px solid #f0f0f0',
    transition: 'transform 0.2s ease',
  },
  productName: {
    fontSize: '1.1rem',
    fontWeight: 600,
    color: '#111',
    textDecoration: 'none',
    display: 'block',
    marginBottom: '0.25rem',
  },
  qtyDropdown: {
    border: '1px solid #efefef',
    borderRadius: '10px',
    padding: '0.5rem',
    fontSize: '0.9rem',
    width: '80px',
    backgroundColor: '#f9f9f9',
    cursor: 'pointer',
    fontWeight: 500,
  },
  removeBtn: {
    background: 'none',
    border: 'none',
    color: '#eb5757',
    fontSize: '0.85rem',
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: 0,
    marginTop: '1rem',
    transition: 'opacity 0.2s',
  },
  summaryCard: {
    backgroundColor: '#111',
    borderRadius: '24px',
    padding: '2.5rem',
    color: '#fff',
    position: 'sticky',
    top: '6rem',
    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
  },
  summaryLine: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '1.2rem',
    fontSize: '1rem',
    color: '#999',
  },
  totalLine: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '2rem',
    paddingTop: '1.5rem',
    borderTop: '1px solid #333',
    fontWeight: 600,
    fontSize: '1.25rem',
    color: '#fff',
  },
  checkoutBtn: {
    width: '100%',
    backgroundColor: '#fff',
    color: '#111',
    border: 'none',
    borderRadius: '14px',
    padding: '1.1rem',
    fontWeight: 600,
    marginTop: '2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    transition: 'all 0.3s ease',
  },
  freeShipNotice: {
    fontSize: '0.85rem',
    color: '#10b981',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    padding: '0.75rem',
    borderRadius: '10px',
    textAlign: 'center',
    marginTop: '1.5rem',
    fontWeight: 500,
  }
};

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  const subtotal = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = +(subtotal * 0.08).toFixed(2);
  const total = +(subtotal + shipping + tax).toFixed(2);

  const handleQtyChange = (item, newQty) => {
    dispatch(addTocart({ ...item, qty: Number(newQty) }));
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  if (cartItems.length === 0) {
    return (
      <div style={styles.page}>
        <Container className="text-center">
          <div style={{ backgroundColor: '#f5f5f5', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
            <FaShoppingBag size={32} color="#ccc" />
          </div>
          <h2 style={styles.heading}>Your bag is empty</h2>
          <Link to="/" className="btn btn-dark px-4 py-2 rounded-pill" style={{ fontWeight: 500 }}>
            Discover Products
          </Link>
        </Container>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <Container>
        <h1 style={styles.heading}>Shopping Bag <span style={{ color: '#999', fontWeight: 400 }}>({cartItems.length})</span></h1>

        <Row className="gx-5">
          <Col lg={8}>
            {cartItems.map((item) => (
              <div key={item._id} style={styles.itemCard}>
                <Row className="align-items-center">
                  <Col xs={4} md={3}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fluid
                      style={{ borderRadius: '12px', objectFit: 'cover', aspectRatio: '1/1' }}
                    />
                  </Col>
                  <Col xs={8} md={9}>
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <Link to={`/product/${item._id}`} style={styles.productName}>
                          {item.name}
                        </Link>
                        <div style={{ color: '#888', fontSize: '0.9rem', marginBottom: '1rem' }}>${item.price.toFixed(2)} / unit</div>
                        
                        <div className="d-flex align-items-center gap-4">
                          <Form.Select
                            size="sm"
                            value={item.qty}
                            onChange={(e) => handleQtyChange(item, e.target.value)}
                            style={styles.qtyDropdown}
                          >
                            {[...Array(item.countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>{x + 1}</option>
                            ))}
                          </Form.Select>
                          <button style={styles.removeBtn} onClick={() => handleRemove(item._id)}>
                            <FaTrashAlt size={12} /> Remove
                          </button>
                        </div>
                      </div>
                      <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>
                        ${(item.qty * item.price).toFixed(2)}
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            ))}
          </Col>

          <Col lg={4}>
            <div style={styles.summaryCard}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '2rem' }}>Summary</h2>
              
              <div style={styles.summaryLine}>
                <span>Subtotal</span>
                <span style={{ color: '#fff' }}>${subtotal.toFixed(2)}</span>
              </div>
              
              <div style={styles.summaryLine}>
                <span>Shipping</span>
                <span style={{ color: shipping === 0 ? '#10b981' : '#fff' }}>
                  {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                </span>
              </div>

              <div style={styles.summaryLine}>
                <span>Estimated Tax</span>
                <span style={{ color: '#fff' }}>${tax.toFixed(2)}</span>
              </div>

              <div style={styles.totalLine}>
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <button 
                style={styles.checkoutBtn} 
                onClick={() => navigate('/login?redirect=/shipping')}
                onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
                onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                Checkout <FaArrowRight size={14} />
              </button>

            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CartScreen;