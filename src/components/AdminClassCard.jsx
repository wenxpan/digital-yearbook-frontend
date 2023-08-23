import React, { useState } from "react"
import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"

const AdminClassCard = () => {
  const [isEditing, setIsEditing] = useState(false)

  const selectedClass = { year: "2020", class: "Koala" }

  const [content, setContent] = useState(selectedClass)

  function handleSave() {
    setIsEditing((prev) => !prev)
    console.log(content)
  }

  function handleChange(changed) {
    setContent((prev) => ({ ...prev, ...changed }))
  }

  return (
    <Card style={{ maxWidth: "25rem" }} className="p-3">
      <Row className="mb-2">
        <Col>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Year</Form.Label>
            <Form.Control
              value={content.year}
              disabled={isEditing ? "" : "disabled"}
              onChange={(e) => handleChange({ year: e.target.value })}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Class</Form.Label>
            <Form.Control
              value={content.class}
              onChange={(e) => handleChange({ class: e.target.value })}
              disabled={isEditing ? "" : "disabled"}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <p className="fw-semibold">Total Students</p>
          <p>20</p>
        </Col>
        <Col>
          <p className="fw-semibold">Registered Students</p>
          <p>10</p>
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <Button variant="danger">Delete</Button>
        </Col>
        <Col xs={3}>
          <Button
            variant={isEditing ? "secondary" : "primary"}
            onClick={() => setIsEditing((prev) => !prev)}
          >
            {isEditing ? "Cancel" : "Edit"}
          </Button>
        </Col>
        {isEditing && (
          <Col xs={3}>
            <Button onClick={handleSave}>Save</Button>
          </Col>
        )}
      </Row>
    </Card>
  )
}

export default AdminClassCard
