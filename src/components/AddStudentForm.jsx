import React from "react"
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"

const AddStudentForm = ({ props }) => {
  const { student, index, handleStudentUpdate, handleStudentDelete } = props
  return (
    <>
      <Row className="align-items-center">
        <Col xs="auto">
          <h4>Student {index}</h4>
        </Col>
        <Col>
          <Button variant="danger" onClick={() => handleStudentDelete(student)}>
            Delete
          </Button>
        </Col>
      </Row>
      <Row className="mb-3" xs={1}>
        <Form.Group controlId="formFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            value={student.firstName}
            onChange={(e) =>
              handleStudentUpdate(student, { firstName: e.target.value })
            }
            required
            type="text"
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            value={student.lastName}
            onChange={(e) =>
              handleStudentUpdate(student, { lastName: e.target.value })
            }
            required
            type="text"
          />
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={student.email}
            onChange={(e) =>
              handleStudentUpdate(student, { email: e.target.value })
            }
            required
            type="email"
          />
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group controlId="formPhoto" className="mb-3">
          <Form.Label>Yearbook photo link (Optional)</Form.Label>
          <Form.Control
            onChange={(e) =>
              handleStudentUpdate(student, { photo: e.target.value })
            }
            type="url"
          />
        </Form.Group>
      </Row>
    </>
  )
}

export default AddStudentForm
