import React, { useState, useEffect } from "react";
import {
  Form,
  Row,
  Col,
  FloatingLabel,
  Button,
  Figure,
  Image,
} from "react-bootstrap";
import Loader from "../Loader";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router";
import { useNavigate } from "react-router";
import { getCategories } from "../../actions/categoryActions";
import { getNeighborhoods } from "../../actions/neighborhood";
import {
  addComplaint,
  getMyComplaintById,
  updateComplaint,
} from "../../actions/complaintActions";
import Message from "../Message";
import axios from "axios";
const ComplaintScreen = () => {
  const location = useLocation();
  const id = location.search ? location.search.split("=")[1] : "";
  const [message, setMessage] = useState("");
  const [topicState, setTopicState] = useState("");
  const [descriptionState, setDescriptionState] = useState("");
  const [subCategoryState, setSubCategoryState] = useState("");
  const [neighborhoodState, setNeighborhoodState] = useState("");
  const [contactEmailState, setContactEmailState] = useState("");
  const [contactNumberState, setContactNumberState] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    category,
    loading: categoryLoading,
    error: categoryError,
  } = useSelector((state) => state.category);
  const {
    complaint,
    loading: getComplaintLoading,
    error: getComplaintError,
  } = useSelector((state) => state.getComplaintById);
  const {
    neighborhood,
    loading: neighborhoodLoading,
    error: neighborhoodError,
  } = useSelector((state) => state.neighborhood);
  const {
    user,
    loading: userLoading,
    error: userError,
  } = useSelector((state) => state.userLogin);
  const { success: addedComplaint } = useSelector(
    (state) => state.addComplaint
  );
  useEffect(() => {
    if (id && complaint && complaint.topic) {
      setTopicState(!getComplaintLoading && complaint.topic);
      setDescriptionState(complaint.description);
      setImage(complaint.img == null ? "" : complaint.img);
      setNeighborhoodState(complaint.neighborhood && complaint.neighborhood.id);
      setSubCategoryState(complaint.sub_category.id);

      setContactNumberState(complaint.contact.phone);
      setContactEmailState(complaint.contact.email);
    }
  }, [complaint]);
  useEffect(() => {
    if (!user) {
      navigate("/");
    } else if (!category || !neighborhood) {
      dispatch(getCategories());
      dispatch(getNeighborhoods());
    }
    if (id) {
      dispatch(getMyComplaintById(id));
    }
    if (complaint && complaint.id == id) {
      console.log("equal");
    }
  }, [dispatch, user, id]);
  const submitHandler = (e) => {
    e.preventDefault();
    setMessage("");
    if (
      !descriptionState ||
      !topicState ||
      !subCategoryState ||
      !neighborhoodState
    ) {
      setMessage("Please fill in all flields");
    } else {
      let form = null;
      if (!isAnonymous) {
        form = {
          description: descriptionState,
          topic: topicState,
          category_id: subCategoryState,
          neighborhood_id: neighborhoodState,
          contact: {
            email: contactEmailState,
            phone: contactNumberState,
          },
        };
      } else {
        form = {
          description: descriptionState,
          topic: topicState,
          category_id: subCategoryState,
          neighborhood_id: neighborhoodState,
          contact: {
            email: "",
            phone: "",
          },
        };
      }
      if (id) {
        dispatch(updateComplaint(id, form));
        setMessage("Complaint updated successfully!");
        scrollToTop();
        setTimeout(() => {
          navigate("/profile");
        }, 2000);
      } else {
        dispatch(addComplaint(form));
        scrollToTop();
        setTimeout(() => {
          navigate("/profile");
        }, 2000);
      }
    }
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // for smoothly scrolling
    });
  };
  const uploadImageHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post(`/api/upload/${id}`, formData, config);
      console.log(data);
      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };
  return (
    <div>
      <h1 className="text-center">
        {id ? "Edit Complaint" : "Make Complaint"}
      </h1>
      <Form onSubmit={submitHandler}>
        <Row className="justify-content-center">
          <Col md={8}>
            {message != "" && (
              <Message id="alert" variant={"success"}>
                {message}
              </Message>
            )}
            {addedComplaint && (
              <Message id="alert" variant="success">
                Complaint submitted!
              </Message>
            )}
            <p className="lead">Complaint Detail</p>
            <FloatingLabel
              controlId="floatingInput1"
              label="Brief Topic of your Complaint"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Brief Topic of your Complaint"
                value={topicState}
                onChange={(e) => setTopicState(e.target.value)}
                required
              />
            </FloatingLabel>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md={8}>
            <FloatingLabel
              controlId="floatingTextarea2"
              label="Please give us thorough detail of your complaint"
              className="mb-3"
            >
              <Form.Control
                as="textarea"
                style={{ height: "100px" }}
                placeholder="Please give us thorough detail of your complaint"
                value={descriptionState}
                onChange={(e) => setDescriptionState(e.target.value)}
                required
              />
            </FloatingLabel>
            {id && (
              <Row>
                <Col>
                  <Form.Group controlId="formFile3" className="mb-3">
                    <Form.Label>Image (not required)</Form.Label>
                    <Form.Control
                      type="file"
                      id="image-file"
                      label={image}
                      onChange={(e) => uploadImageHandler(e)}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  {uploading && <Loader />}
                  {image != "" && (
                    <Image
                      src={image}
                      rounded
                      fluid
                      style={{ width: "100%", height: "100%" }}
                    />
                  )}
                </Col>
              </Row>
            )}
          </Col>
        </Row>
        <Row className="justify-content-center py-3">
          <Col md={8}>
            <p className="lead">Complaint Reference</p>
            <Form.Select
              aria-label="Floating label select example"
              value={neighborhoodState}
              onChange={(e) => setNeighborhoodState(e.target.value)}
              required
            >
              <option>Choose the Neighborhood</option>
              {neighborhood &&
                neighborhood.map((neighborhood) => (
                  <option key={neighborhood.id} value={neighborhood.id}>
                    {neighborhood.name}
                  </option>
                ))}
            </Form.Select>
          </Col>
        </Row>
        <Row className="justify-content-center py-3">
          <Col md={8}>
            <Form.Select
              aria-label="Floating label select example"
              value={subCategoryState}
              onChange={(e) => setSubCategoryState(e.target.value)}
              required
            >
              <option>Choose the Category</option>
              {category &&
                category.map(({ id, category, sub_categories }) => {
                  return (
                    <>
                      <option
                        key={id}
                        disabled
                        style={{ color: "black", fontWeight: "300" }}
                      >
                        *{category}*
                      </option>
                      {sub_categories[0] != null &&
                        sub_categories.map((sub) => (
                          <option key={100 * id + sub.id} value={sub.id}>
                            {sub.sub_category}
                          </option>
                        ))}
                    </>
                  );
                })}
            </Form.Select>
          </Col>
        </Row>
        <Row className="justify-content-center py-3">
          <Col md={8}>
            <p className="text-center lead">
              Anonymous complaint will be refered as a comment and won't get
              feedback
            </p>
            <Form.Group className="mb-3" controlId="formBasicCheckbox4">
              <Form.Check
                label="Anonymous"
                type="checkbox"
                className="py-3"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-center py-3">
          <p className="text-center lead">
            Not required If you would not like to receive response via email or
            phone
          </p>
          <Col md={4}>
            <p className="lead">Contact Email</p>
            <Form.Group className="mb-3" controlId="formBasicEmail5">
              <Form.Control
                disabled={isAnonymous}
                type="email"
                placeholder={
                  isAnonymous ? "Anonymous,not needed" : "Enter contact email"
                }
                value={contactEmailState}
                onChange={(e) => setContactEmailState(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <p className="lead">Contact Number</p>
            <Form.Group className="mb-3" controlId="formBasicEmail6">
              <Form.Control
                type="text"
                disabled={isAnonymous}
                placeholder={
                  isAnonymous ? "Anonymous,not needed" : "Enter contact number"
                }
                value={contactNumberState}
                onChange={(e) => setContactNumberState(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md={8}>
            <Button type="submit">{id ? "Edit" : "Submit"}</Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default ComplaintScreen;
