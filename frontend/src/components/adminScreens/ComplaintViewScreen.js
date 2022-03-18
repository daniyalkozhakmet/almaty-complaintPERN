import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { getComplaintByIdAdmin,updateResponseComplaintAdmin } from "../../actions/adminAction";
import {
  Row,
  Col,
  ListGroup,
  Form,
  FloatingLabel,
  Button,
  Image,
  Alert
} from "react-bootstrap";
import Loader from "../Loader";
import Message from "../Message";
const ComplaintViewScreen = () => {
  const [response, setResponse] = useState("");
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = location.search ? location.search.split("=")[1] : "";
  const { complaint, error, loading } = useSelector(
    (state) => state.getComplaintByIdAdmin
  );
  const { user } = useSelector((state) => state.userLogin);
  useEffect(() => {
    if (!user || !user.is_admin) {
      navigate("/");
    }
    if (!complaint) {
      dispatch(getComplaintByIdAdmin(id));
    }
    if(complaint){  setResponse(complaint && complaint.response && complaint.response);}
  }, [dispatch, complaint]);
  const submitHandler = (e) => {

    dispatch(updateResponseComplaintAdmin(id,{response}))


      navigate('/admin/complaints')

    e.preventDefault();
  };
  return (
    <Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Col>
            <h2 className="py-1">Complaint Summary</h2>
            {complaint && (
              <ListGroup variant="flush">
                <ListGroup.Item className="bg-light text-dark">
                  <Row>
                    <Col>
                      <p
                        style={{
                          fontSize: "14px",
                          color: "#757575",
                          margin: "0",
                        }}
                      >
                        Short :{" "}
                      </p>
                      <p className="lead">{complaint.topic}</p>
                    </Col>
                    {complaint.img != "" && (
                      <Col>
                        <Image
                          src={complaint.img}
                          rounded
                          fluid
                          style={{ width: "100%", height: "100%" }}
                        />
                      </Col>
                    )}
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item className="bg-light text-dark">
                  <p
                    style={{ fontSize: "14px", color: "#757575", margin: "0" }}
                  >
                    Detail :{" "}
                  </p>
                  <p className="lead">{complaint.description}</p>
                </ListGroup.Item>
                <ListGroup.Item className="bg-light text-dark">
                  <Row>
                    <Col>
                      {" "}
                      <p
                        style={{
                          fontSize: "14px",
                          color: "#757575",
                          margin: "0",
                        }}
                      >
                        Reference :{" "}
                      </p>
                      <p className="lead">
                        {complaint.sub_category && complaint.sub_category.name}
                      </p>
                    </Col>
                    <Col>
                      <p
                        style={{
                          fontSize: "14px",
                          color: "#757575",
                          margin: "0",
                        }}
                      >
                        Neighborhood :{" "}
                      </p>
                      <p className="lead">
                        {complaint.neighborhood && complaint.neighborhood.name}
                      </p>
                    </Col>
                  </Row>
                </ListGroup.Item>

                {complaint.contact.email != "" ||
                  (complaint.contact.phone != "" && (
                    <ListGroup variant="flush">
                      <ListGroup.Item className="bg-light text-dark">
                        <div>
                          <Row>
                            <Col>
                              <p
                                style={{
                                  fontSize: "14px",
                                  color: "#757575",
                                  margin: "0",
                                }}
                              >
                                {" "}
                                Contact Email :
                              </p>
                              <p className="lead">
                                {complaint.contact && complaint.contact.email}
                              </p>
                            </Col>
                            <Col>
                              <p
                                style={{
                                  fontSize: "14px",
                                  color: "#757575",
                                  margin: "0",
                                }}
                              >
                                Contact Number :
                              </p>
                              <p className="lead">
                                {complaint.contact && complaint.contact.phone}
                              </p>
                            </Col>
                          </Row>
                        </div>
                      </ListGroup.Item>
                    </ListGroup>
                  ))}
              </ListGroup>
            )}
          </Col>
          <Col>
            <h2>Complaint Response</h2>
            {complaint && complaint.is_replied ? <Alert variant="success">That complaint is replied</Alert> : <Alert variant="danger">That complaint is not replied</Alert> }
            <Form onSubmit={(e) => submitHandler(e)}>
              <FloatingLabel
                controlId="floatingTextarea"
                label="Please reply to that complaint"
                className="mb-3"
              >
                <Form.Control
                  as="textarea"
                  style={{ height: "100px" }}
                  placeholder="Please reply to that complaint"
                  value={response}
                  onChange={(e) => setResponse(e.target.value)}
                  required
                />
              </FloatingLabel>
              <Button type="submit">{complaint && complaint.is_replied ? 'Edit' : 'Reply'}</Button>
            </Form>
          </Col>
        </>
      )}
    </Row>
  );
};

export default ComplaintViewScreen;
