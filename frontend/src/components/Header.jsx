import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaShoppingCart, FaUser } from "react-icons/fa";

function Header() {
  return (
    <header>
      <Navbar
        bg="dark"
        variant="dark"
        expand="lg"
        className="py-3 shadow-sm"
        collapseOnSelect
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className="fw-bold fs-4">Scamazon 🛒</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto gap-2"></Nav>

            <Nav className="align-items-center gap-3">
              <LinkContainer to="/login">
                <Nav.Link>Sign Up</Nav.Link>
              </LinkContainer>

              <LinkContainer to="/cart">
                <Nav.Link className="d-flex align-items-center gap-1">
                  <FaShoppingCart />
                  <span>Cart</span>
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/profile">
                <Nav.Link className="d-flex align-items-center gap-1">
                  <FaUser />
                  <span>Profile</span>
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export { Header };
