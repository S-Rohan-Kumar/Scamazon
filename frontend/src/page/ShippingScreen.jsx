import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";

const ShippingScreen = () => {
  // Styles moved to a constant to keep the return clean
  const ui = {
    label: {
      fontSize: "0.75rem",
      fontWeight: "900",
      letterSpacing: "1.5px",
      textTransform: "uppercase",
      color: "#000",
      marginBottom: "8px",
    },
    input: {
      borderRadius: "0",
      border: "1.5px solid #000",
      padding: "15px",
      fontSize: "0.9rem",
      backgroundColor: "transparent",
      color: "#000",
    },
    button: {
      borderRadius: "0",
      backgroundColor: "#000",
      color: "#fff",
      border: "none",
      padding: "18px",
      fontWeight: "900",
      letterSpacing: "3px",
      marginTop: "20px",
      transition: "all 0.3s ease",
    },
    heading: {
      fontWeight: "800",
      fontSize: "2.8rem",
      letterSpacing: "-1px",
      textTransform: "uppercase",
      lineHeight: "1",
    }
  };

  return (
    <FormContainer>
      {/* Placeholder for your Steps component */}
      <div className="text-center mb-5" style={{ opacity: 0.3, letterSpacing: '4px', fontSize: '0.7rem' }}>
         01 LOGIN ——— <span style={{ color: '#000', fontWeight: 'bold' }}>02 SHIPPING</span> ——— 03 PAYMENT
      </div>

      <header className="mb-5">
        <h1 style={ui.heading}>Shipping <br/> <span style={{ color: "#ccc" }}>Address</span></h1>
        <div style={{ height: "6px", width: "60px", backgroundColor: "#000", marginTop: "15px" }}></div>
      </header>

      <Form>
        <Row>
          <Col md={12}>
            <Form.Group className="mb-4" controlId="address">
              <Form.Label style={ui.label}>Street Address</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="123 SCAM ST." 
                style={ui.input}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-4" controlId="city">
              <Form.Label style={ui.label}>City</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="BENGALURU" 
                style={ui.input}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-4" controlId="postalCode">
              <Form.Label style={ui.label}>Postal Code</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="560001" 
                style={ui.input}
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-5" controlId="country">
          <Form.Label style={ui.label}>Country</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="INDIA" 
            style={ui.input}
          />
        </Form.Group>

        <Button className="w-100 text-uppercase" style={ui.button}>
          Proceed to Checkout
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;