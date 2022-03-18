import React, { useState, useEffect } from "react";
import FormContainer from "../FormContainer";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Loader";
import Message from "../Message";
import  {register} from '../../actions/auth'
const RegisterScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userLogin);
  const { loading, error, user } = userInfo;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== password2) {
      <Message variant="danger">Password does not match</Message>;
    } else {
      console.log({ first_name:firstName, last_name:lastName, email, password1:password })
      dispatch(register({ first_name:firstName, last_name:lastName, email, password1:password }));
    }
  };
  return (
    <div>
      <FormContainer>
        <h1 className="py-3">Sign Up</h1>
        <Form onSubmit={submitHandler}>
          {loading &&<Loader/>}
          {error ?  (
            typeof error =='string'?<Message variant="danger">{error}</Message>:error.map((err,i)=><Message variant="danger" key={i}>{err}</Message>)
          ) : <></>}

          <Form.Group className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter first name"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter last name"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              required
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              placeholder="Confirm password"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Sign Up
          </Button>{" "}
          Already have an account ?{" "}
          <Link
            style={{
              cursor: "pointer",
              textDecoration: "none",
              color: "black",
            }}
            to="/login"
          >
            Sign In
          </Link>
        </Form>
      </FormContainer>
    </div>
  );
};

export default RegisterScreen;
