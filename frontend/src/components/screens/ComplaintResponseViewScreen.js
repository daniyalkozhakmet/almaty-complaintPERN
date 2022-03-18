import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Row, ListGroup, Image, Alert } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { getMyComplaintById } from "../../actions/complaintActions";
import Loader from "../Loader";
import Message from "../Message";
const ComplaintResponseViewScreen = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const id = location.search ? location.search.split("=")[1] : "";
  const { complaint, loading, error } = useSelector(
    (state) => state.getComplaintById
  );

  useEffect(() => {
    if (id) {
      dispatch(getMyComplaintById(id));
    }
  }, [dispatch, id]);
  return (
    <div>
      {" "}
      <Row className="py-1">
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            <Col>
              <h2 className="py-1">Complaint Summary</h2>
              <ListGroup variant="flush">
                <ListGroup.Item className="bg-light text-dark">
                  <Col md={6}>
                    {" "}
                    <p
                      style={{
                        fontSize: "14px",
                        color: "#757575",
                        margin: "0",
                      }}
                    >
                      Short :{" "}
                    </p>
                    <p className="lead">{complaint && complaint.topic}</p>
                  </Col>
                  {complaint && complaint.img !== "" && (
                    <Col>
                      <Image src={complaint.img} rounded fluid />
                    </Col>
                  )}
                </ListGroup.Item>
                <ListGroup.Item className="bg-light text-dark">
                  <p
                    style={{ fontSize: "14px", color: "#757575", margin: "0" }}
                  >
                    Detail :{" "}
                  </p>
                  <p className="lead">{complaint && complaint.description}</p>
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
                        {complaint &&
                          complaint.sub_category &&
                          complaint.sub_category.name}
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
                        {complaint &&
                          complaint.neighborhood &&
                          complaint.neighborhood.name}
                      </p>
                    </Col>
                  </Row>
                </ListGroup.Item>
                {complaint &&
                  complaint.contact &&
                  complaint.contact.email !== "" && (
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
                                {complaint &&
                                  complaint.contact &&
                                  complaint.contact.email}
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
                                {complaint &&
                                  complaint.contact &&
                                  complaint.contact.phone}
                              </p>
                            </Col>
                          </Row>
                        </div>
                      </ListGroup.Item>
                    </ListGroup>
                  )}
              </ListGroup>
            </Col>
            <Col>
              <h2>Complaint Response</h2>
              {complaint && complaint.is_replied ? (
                <div>
                  <p className="lead">{complaint.response}</p>
                </div>
              ) : (
                <Alert variant="info">
                  {"Our staff will respond as soon as possible"}
                </Alert>
              )}
            </Col>
          </>
        )}
      </Row>
    </div>
  );
};

export default ComplaintResponseViewScreen;
