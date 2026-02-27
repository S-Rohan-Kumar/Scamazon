import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useRegisterMutation } from "../slices/usersApiSlice.js";
import { SetCredentials } from "../slices/authSlice.js";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading.jsx";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [register , {isLoading}] = useRegisterMutation()

  const dispatch = useDispatch()
  const navigate = useNavigate()

    const {userInfo} = useSelector((state) => state.auth)

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if(userInfo){
        navigate(redirect)
    }
  },[userInfo,redirect])

  const submitHandler = async (e) => {
        e.preventDefault()

        if(password===confirmPassword  && password.trim() !== "" && confirmPassword.trim() !== "" ){
            try {
                const res = await register({name , email  , password}).unwrap()
                dispatch(SetCredentials({...res}))
                navigate(redirect)
            } catch (error) {
                toast.error(error?.data?.message || error?.message)
            }
        }else{
            toast.error("Passwords do not match")
        }
  }

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
          }import { useDispatch } from 'react-redux';

        `}
      </style>

      <div className="mb-5">
        <h1
          className="fw-bold text-uppercase"
          style={{ color: "#000", fontSize: "2.5rem" }}
        >
          Register
        </h1>
        <div
          style={{ height: "4px", width: "40px", backgroundColor: "#000" }}
        ></div>
      </div>

      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label className="fw-bold" style={{ color: "#000" }}>
            NAME
          </Form.Label>
          <Form.Control
            style={blackBorderStyle}
            type="text"
            placeholder="ENTER NAME"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label className="fw-bold" style={{ color: "#000" }}>
            EMAIL ADDRESS
          </Form.Label>
          <Form.Control
            style={blackBorderStyle}
            type="email"
            placeholder="ENTER EMAIL"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
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

        <Form.Group className="mb-4" controlId="confirmPassword">
          <Form.Label className="fw-bold" style={{ color: "#000" }}>
            CONFIRM PASSWORD
          </Form.Label> 
          <Form.Control
            style={blackBorderStyle}
            type="password"
            placeholder="RE-ENTER PASSWORD"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>

        <Button
          type="submit"
          className="w-100 mb-4 border-0"
          style={blackButtonStyle}
          disabled = {isLoading}
        >
          REGISTER
        </Button>
        { isLoading && <Loading />}
      </Form>

      <Row>
        <Col className="small">
          <span style={{ color: "#000" }}>ALREADY HAVE AN ACCOUNT?</span>{" "}
          <Link
            to={redirect ? `/login?redirect=${redirect}` : "/login"}
            style={{
              color: "#000",
              fontWeight: "bold",
              textDecoration: "underline",
            }}
          >
            LOGIN
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;