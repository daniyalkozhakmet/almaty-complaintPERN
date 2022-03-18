import { Alert, Button } from "react-bootstrap";
import { useState, useEffect } from 'react'
const Message = ({ children, variant }) => {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const timeId = setTimeout(() => {
      setShow(false)
    }, 3000)
    return () => {
      clearTimeout(timeId)
    }
  }, []);
  if (!show) {
    return null;
  }
    return (
      <Alert variant={variant}>
        <p>{children}</p>
      </Alert>
    );

};

export default Message;
