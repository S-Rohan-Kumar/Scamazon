import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import Message from "../components/Message.jsx";
import { useLoginMutation } from "../slices/usersApiSlice.js";
import { SetCredentials } from "../slices/authSlice.js";
import { toast } from "react-toastify";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login , { isLoading }] = useLoginMutation()

  const { userInfo } = useSelector((state) => state.auth);


  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";


  useEffect(() => {
    if(userInfo){
      navigate(redirect)
    }
  },[userInfo , redirect])

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({email , password}).unwrap()
      dispatch(SetCredentials({...res}))
      navigate(redirect)
    } catch (error) {
      console.log(error)
      toast.error(error?.data?.message )
    }
  };

  const blackBorderStyle = {
    borderRadius: "0",
    border: "2px solid #000",
    color: "#000",
    backgroundColor: "#fff",
    boxShadow: "none",
  };

  const blackButtonStyle = {
    borderRadius: "0",
    backgroundColor: "#000",
    borderColor: "#000",
    color: "#fff",
    fontWeight: "900",
    letterSpacing: "2px",
    padding: "12px",
  };

  return (
    <FormContainer>
      <style>
        {`
          .form-control:focus {
            border-color: #000 !important;
            box-shadow: none !important;
          }
        `}
      </style>

      <div className="mb-5">
        <h1
          className="fw-bold text-uppercase"
          style={{ color: "#000", fontSize: "2.5rem" }}
        >
          Sign In
        </h1>
        <div
          style={{ height: "4px", width: "40px", backgroundColor: "#000" }}
        ></div>
      </div>

      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label className="fw-bold" style={{ color: "#000" }}>
            EMAIL
          </Form.Label>
          <Form.Control
            style={blackBorderStyle}
            type="email"
            placeholder="ENTER EMAIL"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="password">
          <Form.Label className="fw-bold" style={{ color: "#000" }}>
            PASSWORD
          </Form.Label>
          <Form.Control
            style={blackBorderStyle}
            type="password"
            placeholder="ENTER PASSWORD"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button
          type="submit"
          className="w-100 mb-4 border-0"
          style={blackButtonStyle}
          disabled={isLoading}
        >
          LOG IN
        </Button>
        {isLoading }
      </Form>

      <Row>
        <Col className="small">
          <span style={{ color: "#000" }}>NEW CUSTOMER?</span>{" "}
          <Link
            to={ redirect ? `/register?redirect=${redirect}` : "/register"}
            style={{
              color: "#000",
              fontWeight: "bold",
              textDecoration: "underline",
            }}
          >
            REGISTER
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
