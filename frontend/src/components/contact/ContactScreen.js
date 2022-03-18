import React from "react";
import { Row, Col } from "react-bootstrap";
import EveryContact from "./EveryContact";
import Messages from "./Messages";
import MessageForm from "./MessageForm";
const ContactScreen = () => {
  return (
    <Row style={{ height: "60vh" }}>
      <Col md={4} sm={3} >
        <h1>Contacts</h1>
        <EveryContact />
        <EveryContact />
        <EveryContact />
      </Col>
      <Col>
        <Row style={{ height: "60vh",overflowY:"auto" }}>
            <Messages />
            <Messages own={true}/>
        </Row>
        <Row>
          {" "}
          <MessageForm />
        </Row>
      </Col>
    </Row>
  );
};

export default ContactScreen;
