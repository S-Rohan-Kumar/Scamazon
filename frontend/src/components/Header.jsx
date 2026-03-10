import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice.js";
import { logOut } from "../slices/authSlice.js";
import SearchBox from "./SearchBox.jsx";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

  .nav-custom {
    font-family: 'Inter', sans-serif;
    background-color: #ffffff !important;
    border-bottom: 1px solid #f0f0f0;
    padding: 1rem 0;
    position: relative; /* Required for absolute centering */
  }

  .nav-brand {
    font-weight: 700;
    font-size: 1.5rem;
    letter-spacing: -0.5px;
    color: #111 !important;
    z-index: 10;
  }

  /* Exact Centering Magic for SearchBox */
  .search-wrapper {
    width: 100%;
    margin-top: 1rem;
    margin-bottom: 1rem;
    display: flex;
    justify-content: center;
  }

  @media (min-width: 992px) {
    .search-wrapper {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      margin: 0;
      width: auto;
      min-width: 400px;
      z-index: 5;
    }
  }

  .nav-item-link {
    color: #555 !important;
    font-weight: 500;
    font-size: 0.95rem;
    padding: 0.5rem 1rem !important;
    transition: color 0.2s ease;
    z-index: 10;
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

  /* Dropdown Styles */
  .custom-dropdown .dropdown-menu {
    border-radius: 0;
    border: 2px solid #000;
    margin-top: 10px;
    box-shadow: 10px 10px 0px rgba(0,0,0,0.1);
  }
  
  .custom-dropdown .dropdown-item {
    font-weight: 700;
    letter-spacing: 1px;
    padding: 12px 20px;
    text-transform: uppercase;
    font-size: 0.8rem;
  }
  
  .custom-dropdown .dropdown-item:hover {
    background-color: #000;
    color: #fff;
  }
`;

function Header() {
  const { cartItems } = useSelector((state) => state.cart);
  const totalQty = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [logout] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logout().unwrap();
      dispatch(logOut());
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <style>{css}</style>
      <Navbar expand="lg" className="nav-custom" collapseOnSelect>
        <Container className="position-relative">
          <LinkContainer to="/">
            <Navbar.Brand className="nav-brand">SCAMAZON</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className="border-0 shadow-none"
          />

          <Navbar.Collapse id="basic-navbar-nav">
            
            <div className="search-wrapper">
              <SearchBox />
            </div>

            <Nav className="ms-auto align-items-center">
              <LinkContainer to="/cart">
                <Nav.Link className="nav-item-link">
                  <div className="cart-icon-wrapper">
                    <FaShoppingCart size={18} />
                    {totalQty > 0 && (
                      <span className="cart-badge">
                        {totalQty > 99 ? "99+" : totalQty}
                      </span>
                    )}
                  </div>
                  <span className="ms-2">Cart</span>
                </Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <NavDropdown
                  title={
                    <span>
                      <FaUser size={16} className="me-1" /> {userInfo.name}
                    </span>
                  }
                  id="username"
                  className="nav-item-link custom-dropdown"
                >
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>My Account</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link className="login-btn">Sign In</Nav.Link>
                </LinkContainer>
              )}

              {userInfo && userInfo.isAdmin && (
                <NavDropdown
                  title="Admin"
                  id="adminmenu"
                  className="nav-item-link custom-dropdown"
                >
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export { Header };