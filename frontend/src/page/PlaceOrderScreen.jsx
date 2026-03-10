import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Row, Col, Image, Container } from "react-bootstrap";
import { FaArrowRight, FaMapMarkerAlt, FaWallet, FaBox } from "react-icons/fa";
import CheckoutSteps from "../components/CheckoutSteps";
import { useCreateOrderMutation } from "../slices/orderApiSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { clearCartItems } from "../slices/cartslice.js";
import { toast } from "react-toastify";

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#fcfcfc",
    paddingTop: "5rem",
    paddingBottom: "5rem",
    fontFamily: "'Inter', sans-serif",
    color: "#1a1a1a",
  },
  heading: {
    fontWeight: 700,
    fontSize: "2rem",
    letterSpacing: "-0.03em",
    marginBottom: "2.5rem",
  },
  itemCard: {
    backgroundColor: "#fff",
    borderRadius: "16px",
    padding: "1.5rem",
    marginBottom: "1rem",
    border: "1px solid #f0f0f0",
  },
  productName: {
    fontSize: "1.1rem",
    fontWeight: 600,
    color: "#111",
    textDecoration: "none",
  },
  summaryCard: {
    backgroundColor: "#111",
    borderRadius: "24px",
    padding: "2.5rem",
    color: "#fff",
    position: "sticky",
    top: "6rem",
    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
  },
  summaryLine: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "1.2rem",
    fontSize: "1rem",
    color: "#999",
  },
  totalLine: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "2rem",
    paddingTop: "1.5rem",
    borderTop: "1px solid #333",
    fontWeight: 600,
    fontSize: "1.25rem",
    color: "#fff",
  },
  checkoutBtn: {
    width: "100%",
    backgroundColor: "#fff",
    color: "#111",
    border: "none",
    borderRadius: "14px",
    padding: "1.1rem",
    fontWeight: 600,
    marginTop: "2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    transition: "all 0.3s ease",
  },
};

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const placeOrderHandler = async () => {
    try {
      const order = {
        orderItems: cart.cartItems.map((item) => ({
          ...item,
          product: item._id,
        })),
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        taxPrice: cart.taxPrice,
        shippingPrice: cart.shippingPrice,
        totalPrice: cart.totalPrice,
      };

      const res = await createOrder(order).unwrap();

      navigate(`/order/${res._id}`);

      dispatch(clearCartItems());
    } catch (error) {
      toast.error(error?.data?.message || error?.message);
    }
  };

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart.shippingAddress, cart.paymentMethod, navigate]);

  return (
    <div style={styles.page}>
      <Container>
        <CheckoutSteps step1 step2 step3 step4 />
        <h1 style={styles.heading}>Review Your Order</h1>

        <Row className="gx-5">
          <Col lg={8}>
            <div style={styles.itemCard}>
              <div className="d-flex align-items-center gap-3 mb-3">
                <FaMapMarkerAlt color="#999" />
                <h3 style={{ fontSize: "1.1rem", fontWeight: 600, margin: 0 }}>
                  Shipping Address
                </h3>
              </div>
              <p
                style={{
                  color: "#666",
                  fontSize: "0.95rem",
                  marginBottom: "0.5rem",
                }}
              >
                {cart.shippingAddress.fullName}
              </p>
              <p style={{ color: "#888", fontSize: "0.9rem", margin: 0 }}>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}{" "}
                {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </div>

            <div style={styles.itemCard}>
              <div className="d-flex align-items-center gap-3 mb-3">
                <FaWallet color="#999" />
                <h3 style={{ fontSize: "1.1rem", fontWeight: 600, margin: 0 }}>
                  Payment Method
                </h3>
              </div>
              <p style={{ color: "#666", fontSize: "0.95rem", margin: 0 }}>
                {cart.paymentMethod}
              </p>
            </div>

            <div style={styles.itemCard}>
              <div className="d-flex align-items-center gap-3 mb-4">
                <FaBox color="#999" />
                <h3 style={{ fontSize: "1.1rem", fontWeight: 600, margin: 0 }}>
                  Order Items
                </h3>
              </div>
              {cart.cartItems.map((item, index) => (
                <Row
                  key={index}
                  className="align-items-center mb-4 g-0 border-bottom pb-3"
                >
                  <Col xs={3} md={2}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fluid
                      style={{
                        borderRadius: "12px",
                        aspectRatio: "1/1",
                        objectFit: "cover",
                      }}
                    />
                  </Col>
                  <Col className="ps-4">
                    <Link
                      to={`/product/${item.product}`}
                      style={styles.productName}
                    >
                      {item.name}
                    </Link>
                    <div style={{ color: "#888", fontSize: "0.9rem" }}>
                      Qty: {item.qty}
                    </div>
                  </Col>
                  <Col
                    xs={3}
                    className="text-end fw-bold"
                    style={{ fontSize: "1.1rem" }}
                  >
                    ${(item.qty * item.price).toFixed(2)}
                  </Col>
                </Row>
              ))}
            </div>
          </Col>

          <Col lg={4}>
            <div style={styles.summaryCard}>
              <h2
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  marginBottom: "2rem",
                }}
              >
                Order Summary
              </h2>

              <div style={styles.summaryLine}>
                <span>Items</span>
                <span style={{ color: "#fff" }}>${cart.itemsPrice}</span>
              </div>

              <div style={styles.summaryLine}>
                <span>Shipping</span>
                <span
                  style={{
                    color: cart.shippingPrice === 0 ? "#10b981" : "#fff",
                  }}
                >
                  {cart.shippingPrice === 0 ? "Free" : `$${cart.shippingPrice}`}
                </span>
              </div>

              <div style={styles.summaryLine}>
                <span>Estimated Tax</span>
                <span style={{ color: "#fff" }}>${cart.taxPrice}</span>
              </div>

              <div style={styles.totalLine}>
                <span>Total</span>
                <span>${cart.totalPrice}</span>
              </div>

              <button
                style={styles.checkoutBtn}
                onClick={placeOrderHandler}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "scale(1.02)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                Place Order <FaArrowRight size={14} />
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PlaceOrderScreen;
