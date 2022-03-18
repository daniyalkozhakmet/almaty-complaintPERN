import React, { useState } from "react";
import { Modal, Form, Container, Button } from "react-bootstrap";
import { addNeighborhood } from "../../actions/neighborhood";
import { useDispatch } from "react-redux";
const AddNeighborhoodModal = (props) => {
  const dispatch = useDispatch();
  const [message,setMessage]=useState('')
  const [neighborhood, setNeighborhood] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
      dispatch(addNeighborhood({ name: neighborhood }));
  };
  const addNeighborhoodHandler = (e) => {
    if(neighborhood !== ""){
      submitHandler(e);
      props.onHide();
    }
    else{
      setMessage('Please')
    }
  };
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Neighborhood
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Container>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Neighborhood</Form.Label>
              <Form.Control
                type="text"
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
                placeholder="Enter neighborhood"
              />
            </Form.Group>
          </Form>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={(e) => addNeighborhoodHandler(e)}>Add</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddNeighborhoodModal;
