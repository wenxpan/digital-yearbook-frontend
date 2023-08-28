import React, { useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"

import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import SchoolContext from "../contexts/SchoolContext"
import { postHelper } from "../utils/apiHelper"
import UserContext from "../contexts/UserContext"

const AddClass = () => {
  const nav = useNavigate()
  const [content, setContent] = useState({ year: "", name: "" })
  const { school, dispatch } = useContext(SchoolContext)
  const { user } = useContext(UserContext)

  function handleUpdate(changed) {
    setContent((prev) => ({ ...prev, ...changed }))
  }

  async function handleSubmit(e) {
    e.preventDefault()

    // check if year exists
    const yearExists = school.years.find((y) => y.name === content.year)
    if (!yearExists) {
      // if not exists, create new year
      const newYear = await postHelper(
        "/years",
        { name: content.year.name },
        user.token
      )
      // add new year to school state
      dispatch({ type: "add_year", year: newYear })
    }
    const createdClass = await postHelper("/classes", content, user.token)
    dispatch({ type: "add_class", class: createdClass })

    nav("/account/classes")
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
              value={content.name}
              onChange={(e) => handleUpdate({ name: e.target.value })}
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
