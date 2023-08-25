import React, { useState, useContext } from "react"
import { Link } from "react-router-dom"

import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"

const AddClass = () => {
  const [content, setContent] = useState({ year: "", class: "" })

  function handleUpdate(changed) {
    setContent((prev) => ({ ...prev, ...changed }))
  }

  function handleSubmit(e) {
    //TODO
    e.preventDefault()
    console.log(content)
  }

  return (
    <Container className="mt-4">
      <Row>
        <h1 className="fs-2">Add Class</h1>
      </Row>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Row>
          <Form.Group controlId="formYear" as={Col}>
            <Form.Label>Year</Form.Label>
            <Form.Control
              value={content.year}
              onChange={(e) => handleUpdate({ year: e.target.value })}
              type="text"
            />
          </Form.Group>
          <Form.Group controlId="formClass" as={Col}>
            <Form.Label>Class</Form.Label>
            <Form.Control
              value={content.class}
              onChange={(e) => handleUpdate({ class: e.target.value })}
              type="text"
            />
          </Form.Group>
        </Row>
        <Row className="text-center mt-4">
          <Col>
            <Button as={Link} to={"/account/classes"}>
              Cancel
            </Button>
          </Col>
          <Col>
            <Button type="submit">Save</Button>
          </Col>
        </Row>
      </Form>
    </Container>
  )
}

export default AddClass
