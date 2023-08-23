import React from "react"
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"

const AddStudentForm = ({ content, handleChange }) => {
  return (
    <>
      <Row className="align-items-center">
        <Col xs="auto">
          <h4>Student 1</h4>
        </Col>
        <Col>
          <Button variant="danger">Delete</Button>
        </Col>
      </Row>
      <Row className="mb-3" xs={1}>
        <Form.Group controlId="formFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            value={content.firstName}
            onChange={(e) => handleChange({ firstName: e.target.value })}
            type="text"
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            value={content.lastName}
            onChange={(e) => handleChange({ lastName: e.target.value })}
            type="text"
          />
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={content.email}
            onChange={(e) => handleChange({ email: e.target.value })}
            type="email"
          />
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group controlId="formPhoto" className="mb-3">
          <Form.Label>Yearbook photo link</Form.Label>
          <Form.Control
            onChange={(e) => handleChange({ photo: e.target.value })}
            type="url"
          />
        </Form.Group>
      </Row>
    </>
  )
}

export default AddStudentForm
