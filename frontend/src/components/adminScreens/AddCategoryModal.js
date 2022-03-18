import React, { useState } from "react";
import { Modal, Form, Container, Button } from "react-bootstrap";
import { addCategory } from "../../actions/categoryActions";
import { useDispatch } from "react-redux";
const AddCategoryModal = (props) => {
  const dispatch=useDispatch()
  const [message,setMessage]=useState('')
  const [category, setCategory] = useState("");
  const submitHandler=(e)=>{
    e.preventDefault()
      dispatch(addCategory({'name':category}))
      setCategory('')
    
  }
  const addCategoryHandler=(e)=>{
    if(category !== ""){
        submitHandler(e);
        props.onHide();
      }
      else{
        setMessage('Please')
      }
  }
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Category
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Container>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Category</Form.Label>
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

export default AddCategoryModal;
