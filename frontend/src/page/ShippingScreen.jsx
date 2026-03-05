import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../slices/cartslice";
import CheckoutSteps from './../components/CheckoutSteps';
 

const ShippingScreen = () => {
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

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const { userInfo } = useSelector((state) => state.auth);

  const [address, setAddress] = useState(shippingAddress?.address || "");
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || "");
  const [country, setCountry] = useState(shippingAddress?.country || "");

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo, navigate]);


  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/payment");
  };

  useEffect(() =>{
      if(!cart.cartItems || cart.cartItems.length===0){
        navigate('/')
      }
    },[navigate,cart])

  return (
    <FormContainer>
      
      <CheckoutSteps step1 step2 />


      <header className="mb-5">
        <h1 style={ui.heading}>Shipping <br /> <span style={{ color: "#ccc" }}>Address</span></h1>
        <div style={{ height: "6px", width: "60px", backgroundColor: "#000", marginTop: "15px" }}></div>
      </header>

      <Form onSubmit={submitHandler}>
        <Row>
          <Col md={12}>
            <Form.Group className="mb-4" controlId="address">
              <Form.Label style={ui.label}>Street Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="123 SCAM ST."
                style={ui.input}
                value={address}
                required
                onChange={(e) => setAddress(e.target.value)}
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
                value={city}
                required
                onChange={(e) => setCity(e.target.value)}
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
                value={postalCode}
                required
                onChange={(e) => setPostalCode(e.target.value)}
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
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
          />
        </Form.Group>

        <Button type="submit" className="w-100 text-uppercase" style={ui.button}>
          Proceed to Checkout
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;