import React from "react"
import { Link } from "react-router-dom"

import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"

const AdminStudentCard = ({ student }) => {
  return (
    <Card style={{ maxWidth: "25rem" }} className="p-3">
      <Row className="mb-2">
        <Col>
          <p className="fw-semibold">First Name</p>
          <p>{student.firstName}</p>
        </Col>
        <Col>
          <p className="fw-semibold">Email</p>
          <p>{student.email}</p>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <p className="fw-semibold">Last Name</p>
          <p>{student.lastName}</p>
        </Col>
        <Col>
          <p className="fw-semibold">Student Id</p>
          <p>{student._id}</p>
        </Col>
      </Row>
      <Row className="text-center">
        <Col>
          <Button variant="danger">Delete</Button>
        </Col>
        <Col>
          <Button
            variant="primary"
            as={Link}
            to={`/students/${student._id}/edit`}
          >
            Edit
          </Button>
        </Col>
      </Row>
    </Card>
  )
}

export default AdminStudentCard
