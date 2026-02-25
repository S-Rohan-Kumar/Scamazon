import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

  .nav-custom {
    font-family: 'Inter', sans-serif;
    background-color: #ffffff !important;
    border-bottom: 1px solid #f0f0f0;
    padding: 1rem 0;
  }

  .nav-brand {
    font-weight: 700;
    font-size: 1.5rem;
    letter-spacing: -0.5px;
    color: #111 !important;
  }

  .nav-item-link {
    color: #555 !important;
    font-weight: 500;
    font-size: 0.95rem;
    padding: 0.5rem 1rem !important;
    transition: color 0.2s ease;
  }

  .nav-item-link:hover {
    color: #111 !important;
  }

  .cart-icon-wrapper {
    position: relative;
    display: inline-block;
  }

  .cart-badge {
    position: absolute;
    top: -8px;
    right: -10px;
    background-color: #111;
    color: #fff;
    font-size: 0.7rem;
    font-weight: 700;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #fff;
  }

  .login-btn {
    background-color: #111;
    color: #fff !important;
    border-radius: 8px;
    padding: 0.5rem 1.25rem !important;
    margin-left: 1rem;
    transition: opacity 0.2s;
  }

  .login-btn:hover {
    opacity: 0.9;
  }
`;

function Header() {
  const { cartItems } = useSelector((state) => state.cart);
  const totalQty = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <>
      <style>{css}</style>
      <Navbar expand="lg" className="nav-custom" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className="nav-brand">SCAMAZON</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto align-items-center">
              <LinkContainer to="/cart">
                <Nav.Link className="nav-item-link">
                  <div className="cart-icon-wrapper">
                    <FaShoppingCart size={18} />
                    {totalQty > 0 && (
                      <span className="cart-badge">
                        {totalQty > 99 ? "99" : totalQty}
                      </span>
                    )}
                  </div>
                  <span className="ms-2">Cart</span>
                </Nav.Link>
              </LinkContainer>

              <LinkContainer to="/profile">
                <Nav.Link className="nav-item-link">
                  <FaUser size={16} className="me-1" /> Profile
                </Nav.Link>
              </LinkContainer>

              <LinkContainer to="/login">
                <Nav.Link className="login-btn">Sign In</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export { Header };