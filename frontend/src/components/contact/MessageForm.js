import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
const MessageForm = () => {
  return (
    <div>
      <Form>
        <Row>
          <Col md={10} sm={9}>
            {" "}
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Col>
          <Col>
            <Button variant="primary" type="submit">
              Send
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default MessageForm;
