import React, { useState, useEffect } from "react";
import { Row, Col, ListGroup, Button, Accordion } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getCategories,
  deleteCategory,
  deleteSubCategory,
} from "../../actions/categoryActions";
import AddNeighborhoodModal from "./addNeighborhoodModal";
import AddCategoryModal from "./AddCategoryModal";
import AddSubCategoryModal from "./AddSubCategoryModal";
import {
  getNeighborhoods,
  deleteNeighborhood,
} from "../../actions/neighborhood";

import Loader from "../Loader";
import Message from "../Message";
const CategoryScreen = () => {
  const [modalShow, setModalShow] = useState(false);
  const [modalShow1, setModalShow1] = useState(false);
  const [modalShow2, setModalShow2] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userLogin);
  const {
    category,
    loading: loadingCategory,
    error: errorCategory,
  } = useSelector((state) => state.category);
  const {
    neighborhood,
    loading: neighborhoodLoading,
    error: errorNeighborhood,
  } = useSelector((state) => state.neighborhood);
  useEffect(() => {
    if (!user.is_admin) {
      navigate("/");
    } else {
      dispatch(getCategories());
      dispatch(getNeighborhoods());
    }
  }, [dispatch, user]);
  const neighborhoodDeleteHandler = (id) => {
    if (window.confirm("Do you want to delete that neighborhood ?Once you delete this neighborhood,all complaints related to that neighborhood will be deleted!")) {
      dispatch(deleteNeighborhood(id));
    }
  };
  const categoryDeleteHandler = (id) => {
    if (
      window.confirm(
        "Are you sure? Once you delete this category,all sub category and complaints related to that category will be deleted!"
      )
    ) {
      dispatch(deleteCategory(id));
    }
  };
  const subCategoryDeleteHandler = (cat, sub) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteSubCategory(cat, sub));
    }
  };
  return (
    <div>
      <Row>
        <Col md={4}>
          <div className="d-flex justify-content-between align-items-center">
            <h2>Neighborhood</h2>
            <Button className="btn-sm" onClick={() => setModalShow(true)}>
              <i className="fa fa-plus" aria-hidden="true"></i> Neighborhood
            </Button>
          </div>
          {neighborhoodLoading ? (
            <Loader />
          ) : errorNeighborhood ? (
            <Message variant="danger">{errorNeighborhood}</Message>
          ) : (
            <>
              <ListGroup variant="flush" className="py-3">
                {neighborhood &&
                  neighborhood.map((nei) => (
                    <span key={nei.id} className="border-bottom">
                      <ListGroup.Item
                        style={{ background: "transparent", color: "black" }}
                      >
                        {neighborhood.indexOf(nei) + 1}
                        {". "}
                        {nei.name}
                        <Button
                          variant="light"
                          className="btn-sm mx-1"
                          style={{ float: "right", color: "red" }}
                          onClick={(e) => neighborhoodDeleteHandler(nei.id)}
                        >
                          <i className="fa fa-trash"></i>
                        </Button>
                      </ListGroup.Item>
                    </span>
                  ))}
              </ListGroup>
            </>
          )}
        </Col>
        <Col>
          {loadingCategory ? (
            <Loader />
          ) : errorCategory ? (
            <Message variant="danger">{errorCategory}</Message>
          ) : (
            <>
              <div className="d-flex justify-content-between align-items-center">
                <h2>Category</h2>
                <div>
                  <Button
                    className="btn-sm mx-3"
                    onClick={() => setModalShow1(true)}
                  >
                    <i className="fa fa-plus" aria-hidden="true"></i> Category
                  </Button>
                  <Button
                    className="btn-sm"
                    onClick={() => setModalShow2(true)}
                  >
                    <i className="fa fa-plus" aria-hidden="true"></i> Sub
                    Category
                  </Button>
                </div>
              </div>
              <Accordion defaultActiveKey="0" flush>
                {category &&
                  category.map((cat) => (
                    <Accordion.Item eventKey={cat.id} key={cat.id}>
                      <Accordion.Header>
                        <i
                          className="fa fa-list-alt mx-2"
                          aria-hidden="true"
                        ></i>
                        {cat.category}

                        <Button
                          variant="light"
                          className="btn-sm mx-1"
                          style={{ float: "right", color: "red" }}
                          onClick={(e) => categoryDeleteHandler(cat.id)}
                        >
                          <i className="fa fa-trash"></i>
                        </Button>
                      </Accordion.Header>
                      <Accordion.Body>
                        <ListGroup>
                          {cat.sub_categories &&
                            cat.sub_categories[0] != null &&
                            cat.sub_categories.map((sub) => (
                              <ListGroup.Item
                                key={cat.id * 1000 + sub.id}
                                style={{
                                  background: "transparent",
                                  color: "black",
                                }}
                              >
                                {sub.sub_category}
                                <Button
                                  variant="light"
                                  className="btn-sm mx-1"
                                  style={{ float: "right" }}
                                  onClick={(e) =>
                                    subCategoryDeleteHandler(cat.id, sub.id)
                                  }
                                >
                                  <i className="fas fa-times"></i>
                                </Button>
                              </ListGroup.Item>
                            ))}
                        </ListGroup>
                      </Accordion.Body>
                    </Accordion.Item>
                  ))}
              </Accordion>
            </>
          )}
        </Col>
      </Row>
      <AddNeighborhoodModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <AddCategoryModal show={modalShow1} onHide={() => setModalShow1(false)} />
      <AddSubCategoryModal
        show={modalShow2}
        onHide={() => setModalShow2(false)}
      />
    </div>
  );
};

export default CategoryScreen;
