import React, { useState } from "react";
import { Modal, Form, Container, Button, FloatingLabel } from "react-bootstrap";
//import { createSubCategory } from "../../actions/categoryNeighborhoodActions";
import { addSubCategory } from "../../actions/categoryActions";
import { useDispatch, useSelector } from "react-redux";
import Message from "../Message";
const AddSubCategoryModal = (props) => {
  const dispatch = useDispatch();
  const getCategory = useSelector((state) => state.category);
  const { category: categoryState } = getCategory;
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState("");
  const [category1, setCategory1] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      addSubCategory({
        name: category,
        category_id: category1,
      })
    );
  };
  const addCategoryHandler = (e) => {
    if (category == "" || category1 == "") {
      setMessage("Please fill in all fields");
    } else {
      props.onHide();
      submitHandler(e);
      setCategory1("");
      setCategory("");
      setMessage("");
    }
  };
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Sub-Category
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Container>
          <Form onSubmit={submitHandler}>
            <FloatingLabel controlId="floatingSelect" label="Required field">
              <Form.Select
                aria-label="Floating label select example"
                value={category1}
                required
                onChange={(e) => setCategory1(e.target.value)}
              >
                <option>Select category below</option>
                {categoryState && categoryState.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.category}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Sub Category</Form.Label>
              <Form.Control
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Enter Category"
              />
            </Form.Group>
          </Form>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={(e) => addCategoryHandler(e)}>Add</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddSubCategoryModal;
