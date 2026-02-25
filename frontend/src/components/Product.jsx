import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const styles = {
  card: {
    border: 'none',
    borderRadius: '16px',
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    transition: 'all 0.3s ease',
    height: '100%',
  },
  imageWrapper: {
    backgroundColor: '#f8f8f8',
    aspectRatio: '1 / 1',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.5s ease',
  },
  title: {
    fontSize: '0.95rem',
    fontWeight: '600',
    color: '#1a1a1a',
    textDecoration: 'none',
    display: 'block',
    marginBottom: '0.5rem',
    lineHeight: '1.4',
    height: '2.8rem',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
  },
  price: {
    fontSize: '1.15rem',
    fontWeight: '700',
    color: '#111',
    margin: '0.5rem 0',
  }
};

export const Product = ({ product }) => {
  return (
    <Card 
      style={styles.card} 
      className="shadow-sm h-100"
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.1)';
        e.currentTarget.querySelector('img').style.transform = 'scale(1.08)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)';
        e.currentTarget.querySelector('img').style.transform = 'scale(1)';
      }}
    >
      <Link to={`/product/${product._id}`} style={styles.imageWrapper}>
        <Card.Img 
          src={product.image} 
          variant="top" 
          style={styles.image} 
        />
      </Link>

      <Card.Body className="p-3">
        <Link to={`/product/${product._id}`} style={styles.title}>
          <Card.Title as="div" style={{ fontSize: 'inherit', fontWeight: 'inherit', margin: 0 }}>
            {product.name}
          </Card.Title>
        </Link>

        <Card.Text as="div" className="mb-2">
          <Rating value={product.rating} text={`${product.numReviews} reviews`} />
        </Card.Text>

        <Card.Text as="h3" style={styles.price}>
          ${product.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};