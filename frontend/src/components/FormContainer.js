import React from 'react'
import {Row,Col} from 'react-bootstrap'
const FormContainer = ({children}) => {
    return (
        <Row className='justify-content-center'>
            <Col md={6}>
            {children}
            </Col>
        </Row>
    )
}

export default FormContainer
