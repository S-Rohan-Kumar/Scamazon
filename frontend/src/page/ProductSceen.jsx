import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Row, Col, Image, Button, Form, Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import Rating from '../components/Rating';
import Loading from '../components/Loading';
import { useGetproductDetailsQuery } from "../slices/productsApiSlice";
import { addTocart } from "../slices/cartslice.js";

const styles = {
  backLink: {
    color: '#666',
    textDecoration: 'none',
    fontSize: '0.9rem',
    display: 'inline-block',
    marginBottom: '2rem',
    transition: 'color 0.2s'
  },
  productName: {
    fontSize: '2.5rem',
    fontWeight: 600,
    letterSpacing: '-0.02em',
    marginBottom: '1rem',
    color: '#111'
  },
  description: {
    lineHeight: '1.8',
    color: '#444',
    fontSize: '1.05rem',
    marginTop: '2rem'
  },
  purchaseCard: {
    backgroundColor: '#ffffff',
    padding: '2rem',
    borderRadius: '20px',
    border: '1px solid #f0f0f0',
    position: 'sticky',
    top: '2rem',
    boxShadow: '0 10px 30px rgba(0,0,0,0.03)'
  },
  addToCartBtn: {
    backgroundColor: '#111',
    color: '#fff',
    border: 'none',
    padding: '1.1rem',
    borderRadius: '14px',
    fontWeight: 600,
    fontSize: '1rem',
    marginTop: '1rem',
    width: '100%',
    transition: 'all 0.3s ease',
    letterSpacing: '0.3px'
  },
  qtySelect: {
    borderRadius: '10px',
    padding: '0.7rem',
    border: '1px solid #e5e5e5',
    backgroundColor: '#fafafa',
    cursor: 'pointer'
  }
};

export const ProductSceen = () => {
  const { id } = useParams();
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: product, isLoading, isError, error } = useGetproductDetailsQuery(id);

  const addToCartHandler = () => {
    dispatch(addTocart({ ...product, qty }));
    navigate('/cart');
  };

  if (isLoading) return <Loading />;
  if (isError) return <div className="mt-5">{error?.data?.message || error.error}</div>;

  return (
    <Container className="py-5">
      <Link to="/" style={styles.backLink} onMouseEnter={e => e.target.style.color = '#111'} onMouseLeave={e => e.target.style.color = '#666'}>
        &larr; Back to gallery
      </Link>

      <Row className="gx-5">
        <Col lg={7}>
          <Image 
            src={product.image} 
            alt={product.name} 
            fluid 
            style={{ borderRadius: '24px', backgroundColor: '#fcfcfc' }} 
          />
        </Col>

        <Col lg={5}>
          <div className="ps-lg-4">
            <h1 style={styles.productName}>{product.name}</h1>
            <div className="d-flex align-items-center gap-3 mb-4">
              <Rating value={product.rating} text={`${product.numReviews} reviews`} />
            </div>

            <p style={styles.description}>{product.description}</p>
            
            <div style={styles.purchaseCard} className="mt-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span style={{ color: '#888', fontWeight: 500 }}>Unit Price</span>
                <span style={{ fontSize: '1.4rem', fontWeight: 700 }}>${product.price}</span>
              </div>

              <div className="d-flex justify-content-between align-items-center mb-4">
                <span style={{ color: '#888', fontWeight: 500 }}>Availability</span>
                <span style={{ color: product.countInStock > 0 ? '#10b981' : '#ef4444', fontWeight: 600, fontSize: '0.95rem' }}>
                  {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>

              {product.countInStock > 0 && (
                <div className="mb-4">
                  <Form.Label style={{ fontSize: '0.85rem', color: '#888', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Quantity</Form.Label>
                  <Form.Select
                    value={qty}
                    onChange={(e) => setQty(Number(e.target.value))}
                    style={styles.qtySelect}
                  >
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>{x + 1}</option>
                    ))}
                  </Form.Select>
                </div>
              )}

              <button
                style={{
                  ...styles.addToCartBtn,
                  opacity: product.countInStock === 0 ? 0.4 : 1,
                  cursor: product.countInStock === 0 ? 'not-allowed' : 'pointer'
                }}
                disabled={product.countInStock === 0}
                onClick={addToCartHandler}
                onMouseEnter={e => {
                  if(product.countInStock > 0) {
                    e.currentTarget.style.backgroundColor = '#333';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }
                }}
                onMouseLeave={e => {
                  if(product.countInStock > 0) {
                    e.currentTarget.style.backgroundColor = '#111';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }
                }}
              >
                {product.countInStock === 0 ? 'Sold Out' : 'Add to Bag'}
              </button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};