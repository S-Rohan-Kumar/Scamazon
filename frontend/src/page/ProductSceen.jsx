import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import Rating from '../components/Rating'
import products from '../products'

export const ProductSceen = () => {
  const { id: productid } = useParams()
  const product = products.find((p) => p._id === productid)

  if (!product) return <h2 className='text-center mt-5'>Product Not Found</h2>

  return (
    <>
      <Link className='btn btn-outline-secondary my-3' to='/'>
        <i className='fas fa-arrow-left'></i> Go Back
      </Link>

      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid rounded className='shadow-sm' />
        </Col>
        <Col md={3}>
          <ListGroup variant='flush' className='border-0'>
            <ListGroup.Item>
              <h3 className='fw-bold text-uppercase' style={{ letterSpacing: '1px' }}>
                {product.name}
              </h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating value={product.rating} text={`${product.numReviews} reviews`} />
            </ListGroup.Item>
            <ListGroup.Item className='fs-4 fw-light'>
              Price: <span className='fw-bold'>${product.price}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              <small className='text-muted'>Description:</small>
              <p className='mt-2'>{product.description}</p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card className='shadow-sm border-0'>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col className='text-muted'>Price:</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col className='text-muted'>Status:</Col>
                  <Col>
                    <span className={product.countInStock > 0 ? 'text-success fw-bold' : 'text-danger fw-bold'}>
                      {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item className='d-grid'>
                <Button
                  variant='dark'
                  type='button'
                  size='lg'
                  disabled={product.countInStock === 0}
                  className='rounded-pill'
                >
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}