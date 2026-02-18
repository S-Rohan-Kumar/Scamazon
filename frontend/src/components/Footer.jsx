import React from 'react'
import { Container , Row , Col } from 'react-bootstrap'


function Footer() {
    const current_year = new Date().getFullYear();
  return (
    <footer>
        <Container>
            <Row>
                <Col className='text-center py-3'>
                <p>Scamazon @copy {current_year}</p>
                </Col>
            </Row>
        </Container>
    </footer>
  )
}

export default Footer