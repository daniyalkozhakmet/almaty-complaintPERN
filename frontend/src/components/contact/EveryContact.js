import React from "react";
import { Image, Col, Row } from "react-bootstrap";
import city from "../../city.svg";
import './EveryContact.css'
const EveryContact = () => {
  return (
    <div>
      <Row className='py-2 px-1 contact-wrapper border-bottom1'>
        <Col md={1} sm={3} style={{ padding: "0" }}>
          <Image className="contact-img"
            src={city}
            fluid
            rounded
          />
        </Col>
        <Col><span className='name-contact'>Name Name</span></Col>
      </Row>
    </div>
  );
};

export default EveryContact;
