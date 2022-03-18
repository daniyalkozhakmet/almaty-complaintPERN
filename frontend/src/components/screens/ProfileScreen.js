import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Form, Button, Table, Alert ,Pagination} from "react-bootstrap";
import { getProfile, updateProfile } from "../../actions/profile";
import { useNavigate, useLocation } from "react-router-dom";
import {
  getMyComplaints,
  deleteComplaintById,
} from "../../actions/complaintActions";
import Loader from "../Loader";
import Message from "../Message";
import { CLEAR_ADD_FAIL_COMPLAINT } from "../../types/complaint";
const ProfileScreen = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.userLogin);
  const { loading, error, user } = userInfo;
  const profileReducer = useSelector((state) => state.getProfile);
  const {
    profile,
    loading: loadingProfile,
    error: errorProfile,
  } = profileReducer;
  const { success, error: errorUpdateProfile } = useSelector(
    (state) => state.updateProfile
  );
  const { success: addedComplaint } = useSelector(
    (state) => state.addComplaint
  );
  const {
    complaint: myComplaints,
    error: errorMyComplaints,
    loading: loadingMyComplaints,
    page,pages
  } = useSelector((state) => state.getComplaints);
  const [message, setMessage] = useState(null);
  const [type, setType] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    if (password != password2) {
      setMessage("Password does not match");
      setType("danger");
    } else if (password == password2 && password !== "") {
      setMessage(null);
      setType("");
      dispatch(
        updateProfile({
          email,
          first_name: firstName,
          last_name: lastName,
          password,
        })
      );
    } else {
      setMessage(null);
      setType("");
      dispatch(
        updateProfile({ email, first_name: firstName, last_name: lastName })
      );
    }
  };
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    if (addedComplaint) {
      dispatch({ type: CLEAR_ADD_FAIL_COMPLAINT });
    }
    if (!profile) {
      dispatch(getProfile());
    } else {
      setLastName(profile.last_name);
      setFirstName(profile.first_name);
      setEmail(profile.email);
      dispatch(getMyComplaints());
    }
  }, [dispatch, user, profile]);
  const addComplaintHandler = () => {navigate('/complaint/create')};
  const viewComplaintHandler = (id) => {navigate(`/complaint/view?id=${id}`)};
  const deleteComplaintHandler = (id) => {
    if (window.confirm("Do you want to delete complaint with that ID")) {
      dispatch(deleteComplaintById(id));
    }
  };
  const editComplaintHandler = (id) => {
    navigate(`/complaint/create?id=${id}`);
  };
const paginatFunc=(page)=>{
  dispatch(getMyComplaints(page))
}
  return (
    <Row>
      <Col md={4}>
        <h1>My Profile</h1>
        {message && <Message variant={type}>{message}</Message>}
        {success && (
          <Message variant="success">
            Profile has been updated successfully!
          </Message>
        )}
        {loadingProfile ? (
          <Loader />
        ) : error || errorUpdateProfile ? (
          <Message variant="danger">
            {error ? error : errorUpdateProfile}
          </Message>
        ) : (
          <></>
        )}
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail1">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter Name"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail9">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter Last Name"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail8">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword1">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword5">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              placeholder="Confirm password"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Edit
          </Button>
        </Form>
      </Col>
      <Col>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingBottom: "10px",
          }}
        >
          <h2 className="px-1">My Complaints</h2>
          <Button onClick={(e) => addComplaintHandler(e)}>Add Complaint</Button>
        </div>
        {loadingMyComplaints ? (
          <Loader />
        ) : errorMyComplaints ? (
          <Message variant="danger">{errorMyComplaints}</Message>
        ) : (
          <>
            <Alert variant="warning">
              If complaint is Replied then you can <strong>Not Edit</strong> and{" "}
              <strong>Delete</strong>
            </Alert>
            {myComplaints && myComplaints.length>0 ? (
              <>
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Short</th>
                    <th>Reference</th>
                    <th></th>
                    <th>Replied</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {myComplaints.map((complaint) => (
                    <tr key={complaint.id}>
                      <td>{complaint.id}</td>
                      <td>{complaint.topic}</td>
                      <td>{complaint.sub_category.category}</td>
                      <td>{complaint.sub_category.name}</td>
                      <td>
                        {complaint.is_replied ? (
                          <i
                            className="fas fa-check mx-3"
                            style={{ color: "green" }}
                          ></i>
                        ) : (
                          <i
                            className="fas fa-times mx-3"
                            style={{ color: "red" }}
                          ></i>
                        )}
                      </td>
                      <td>
                        <Button
                          className="btn-sm"
                          style={{ float: "right" }}
                          onClick={(e) => viewComplaintHandler(complaint.id)}
                        >
                          View
                        </Button>

                        {!complaint.is_replied && (
                          <Button
                            className="btn-sm mx-3"
                            variant="light"
                            style={{ float: "right" }}
                            onClick={(e) =>
                              deleteComplaintHandler(complaint.id)
                            }
                          >
                            <i
                              className="fa fa-trash"
                              aria-hidden="true"
                              style={{ color: "red" }}
                            ></i>
                          </Button>
                        )}
                        {!complaint.is_replied && (
                          <Button
                            className="btn-sm"
                            variant="light"
                            style={{ float: "right" }}
                            onClick={(e) => editComplaintHandler(complaint.id)}
                          >
                            <i className="fas fa-edit"></i>
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div className="py-4">
            {page == pages && pages == 1 && page == 1 ? (
              <></>
            ) : (
              <Pagination>
                {[...Array(pages).keys()].map((p) =>
                  p + 1 == page ? (
                    <Pagination.Item
                      key={p + 1}
                      active
                      onClick={(e) => paginatFunc(p + 1)}
                    >
                      {p + 1}
                    </Pagination.Item>
                  ) : (
                    <Pagination.Item
                      key={p + 1}
                      onClick={(e) => paginatFunc(p + 1)}
                    >
                      {p + 1}
                    </Pagination.Item>
                  )
                )}
              </Pagination>
            )}
          </div>
              </>
            ) : <Alert variant='info'>There are no complaint by you</Alert>}
          </>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
