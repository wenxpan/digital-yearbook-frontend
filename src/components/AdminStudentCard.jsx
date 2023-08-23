import React from "react"
import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"

const AdminStudentCard = () => {
  return (
    <Card style={{ maxWidth: "25rem" }} className="p-3">
      <Row className="mb-2">
        <Col>
          <p className="fw-semibold">First Name</p>
          <p>John</p>
        </Col>
        <Col>
          <p className="fw-semibold">Last Name</p>
          <p>Doe</p>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <p className="fw-semibold">Email</p>
          <p>john@gmail.com</p>
        </Col>
        <Col>
          <p className="fw-semibold">Invite Code</p>
          <p>fjdalkfjdklajfekl</p>
        </Col>
      </Row>
      <Row className="text-center">
        <Col>
          <Button variant="danger">Delete</Button>
        </Col>
        <Col>
          <Button variant="primary">Edit</Button>
        </Col>
      </Row>
    </Card>
  )
}

export default AdminStudentCard
