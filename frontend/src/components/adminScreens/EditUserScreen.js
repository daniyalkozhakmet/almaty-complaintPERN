import FormContainer from "../FormContainer";
import Loader from "../Loader";
import Message from "../Message";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { Form, Button } from "react-bootstrap";
import { getUserAdmin, updateUserAdmin } from "../../actions/adminAction";
const EditUserScreen = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const getUser = useSelector((state) => state.getUserAdmin);
  const { loading, error, user } = getUser;
  const userLogin = useSelector((state) => state.userLogin);
  const { user: userLog } = userLogin;
  const id = location.search ? location.search.split("=")[1] : "";
  useEffect(() => {
    if (!userLog || (userLog && !userLog.is_admin)) {
      navigate("/");
    }
    if (!user) {
      dispatch(getUserAdmin(id));
    } else {
      setEmail(user.email);
      setFirstName(user.first_name);
      setLastName(user.last_name);
      setIsAdmin(user.is_admin);
    }
  }, [dispatch, user, userLog, id]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateUserAdmin(id, {
        email,
        first_name: firstName,
        last_name: lastName,
        is_admin: isAdmin,
      })
    );
    setShow(true);
    scrollToTop()
    setTimeout(() => {
      setShow(false);
      navigate("/admin/users");
    }, 2000);
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // for smoothly scrolling
    });
  };
  return (
    <div>
      <FormContainer>
        <h1>Edit User</h1>
        {show && (
          <Message variant={"success"}>User updated successfully!</Message>
        )}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword4">
              <Form.Label>First name</Form.Label>
              <Form.Control
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword5">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox6">
              <Form.Check
                label="Admin"
                type="checkbox"
                className="py-3"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Edit
            </Button>
          </Form>
        )}
      </FormContainer>
    </div>
  );
};

export default EditUserScreen;
