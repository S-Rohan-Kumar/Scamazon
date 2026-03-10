import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Row, Col, Image, Form, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Rating from '../components/Rating';
import Loading from '../components/Loading';
import Message from '../components/Message';
import { useGetproductDetailsQuery, useCreateReviewMutation } from "../slices/productsApiSlice";
import { addTocart } from "../slices/cartslice.js";
import { toast } from 'react-toastify';
import Meta from '../components/Meta.jsx';

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
  },
  reviewSection: {
    marginTop: '6rem',
    borderTop: '1px solid #eee',
    paddingTop: '4rem'
  },
  reviewCard: {
    backgroundColor: '#fff',
    padding: '1.5rem',
    borderRadius: '16px',
    border: '1px solid #f0f0f0',
    marginBottom: '1rem'
  },
  reviewForm: {
    backgroundColor: '#f8f9fa',
    padding: '2rem',
    borderRadius: '20px',
    border: '1px solid #eee'
  },
  input: {
    backgroundColor: '#fff',
    border: '1px solid #e5e5e5',
    borderRadius: '10px',
    padding: '0.8rem',
    fontSize: '0.95rem'
  },
  submitBtn: {
    backgroundColor: '#111',
    color: '#fff',
    border: 'none',
    padding: '0.8rem 1.5rem',
    borderRadius: '10px',
    fontWeight: 600,
    marginTop: '1rem',
    transition: 'all 0.3s ease'
  }
};

export const ProductSceen = () => {
  const { id } = useParams();
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: product, isLoading, refetch, isError, error } = useGetproductDetailsQuery(id);
  const [createReview, { isLoading: loadingProductReview }] = useCreateReviewMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const addToCartHandler = () => {
    dispatch(addTocart({ ...product, qty }));
    navigate('/cart');
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({
        id,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success('Review submitted successfully');
      setRating(0);
      setComment('');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  if (isLoading) return <Loading />;
  if (isError) return <div className="mt-5">{error?.data?.message || error.error}</div>;

  return (
    <Container className="py-5">
      <Meta title={product.name} />

      <Link to="/" style={styles.backLink} onMouseEnter={e => e.target.style.color = '#111'} onMouseLeave={e => e.target.style.color = '#666'}>
        &larr; Back to gallery
      </Link>

      <Row className="gx-5">
        <Col lg={7}>
          <Image 
            src={product.image} 
            alt={product.name} 
            fluid 
            style={{ borderRadius: '24px', backgroundColor: '#fcfcfc', width: '100%', height: '500px', objectFit: 'cover' }} 
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

      <Row style={styles.reviewSection} className="gx-5">
        <Col md={6} className="mb-5">
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '2rem' }}>Customer Reviews</h2>
          {product.reviews.length === 0 && <Message>No Reviews Yet</Message>}
          
          {product.reviews.map((review) => (
            <div key={review._id} style={styles.reviewCard}>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <strong style={{ fontSize: '1.05rem', color: '#111' }}>{review.name}</strong>
                <Rating value={review.rating} />
              </div>
              <p style={{ fontSize: '0.85rem', color: '#999', marginBottom: '1rem' }}>
                {review.createdAt.substring(0, 10)}
              </p>
              <p style={{ color: '#444', lineHeight: '1.6', margin: 0 }}>
                {review.comment}
              </p>
            </div>
          ))}
        </Col>

        <Col md={6}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '2rem' }}>Write a Review</h2>
          {loadingProductReview && <Loading />}
          
          {userInfo && !userInfo.isAdmin ? (
            <Form onSubmit={submitHandler} style={styles.reviewForm}>
              <Form.Group controlId="rating" className="mb-4">
                <Form.Label style={{ fontSize: '0.85rem', color: '#666', fontWeight: 600, textTransform: 'uppercase' }}>Rating</Form.Label>
                <Form.Select
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  style={styles.input}
                  className="shadow-none"
                >
                  <option value="">Select...</option>
                  <option value="1">1 - Poor</option>
                  <option value="2">2 - Fair</option>
                  <option value="3">3 - Good</option>
                  <option value="4">4 - Very Good</option>
                  <option value="5">5 - Excellent</option>
                </Form.Select>
              </Form.Group>

              <Form.Group controlId="comment" className="mb-4">
                <Form.Label style={{ fontSize: '0.85rem', color: '#666', fontWeight: 600, textTransform: 'uppercase' }}>Comment</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  style={{ ...styles.input, resize: 'none' }}
                  className="shadow-none"
                />
              </Form.Group>

              <button
                disabled={loadingProductReview}
                type="submit"
                style={styles.submitBtn}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                Submit Review
              </button>
            </Form>
          ) : (
            <Message>
              Please <Link to="/login" style={{ color: '#111', fontWeight: 600 }}>sign in</Link> to write a review.
            </Message>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProductSceen;