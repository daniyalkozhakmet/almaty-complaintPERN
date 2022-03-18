import React, { useEffect } from "react";
import { Button, Row, Col, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import city from "../../../src/city.svg";
import Card from "../home/Card";
import { getNeighborhoods } from "../../actions/neighborhood";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import Message from "../Message";
const HomeScreen = () => {
  const colors = ["primary", "secondary", "success", "danger", "warning"];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { neighborhood, loading, error } = useSelector(
    (state) => state.neighborhood
  );
  useEffect(() => {
    dispatch(getNeighborhoods());
  }, [dispatch]);
  return (
    <div>
      <Row className="py-2 gx-5 mb-5">
        <Col
          md={6}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div class="mb-5 mb-lg-0 text-center text-lg-start">
            <h1 class="display-1 lh-1 mb-3">Let's make our city better</h1>
            <p class="lead mb-5 py-1">
              Launch your mobile app landing page faster with this free, open
              source theme from Start Bootstrap!
            </p>
            <Button
              className="btn btn-primary p-3"
              onClick={(e) => navigate("/complaint/create")}
            >
              Add Complaint
            </Button>
          </div>
        </Col>
        <Col
          md={6}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            src={city}
            fluid
            rounded
            style={{ width: "70%", height: "70%" }}
            alt="My Happy SVG"
          />
        </Col>
      </Row>
      <Row>
        {" "}
        <h2 className="py-3"> Neighborhoods of Almaty </h2>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant={"danger"}>{error}</Message>
      ) : (
        <Row>
          {neighborhood &&
            neighborhood.map((n) => (
              <Col sm={12} md={6} lg={4}>
                <Card
                  color={colors[Math.floor(Math.random() * colors.length)]}
                  name={n.name}
                />
              </Col>
            ))}
        </Row>
      )}
    </div>
  );
};

export default HomeScreen;
