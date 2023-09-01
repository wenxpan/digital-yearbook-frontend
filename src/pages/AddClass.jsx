import React, { useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import ToastWarning from "../components/ToastWarning"

import SchoolContext from "../contexts/SchoolContext"
import UserContext from "../contexts/UserContext"
import { apiPost } from "../utils/apiHelper"

const AddClass = () => {
  const nav = useNavigate()
  const [content, setContent] = useState({ name: "", year: "" })
  const { school, dispatch } = useContext(SchoolContext)
  const { user } = useContext(UserContext)

  function handleInputChange(changed) {
    setContent((prev) => ({ ...prev, ...changed }))
  }

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      // check if year exists
      const yearExists = school.years.find((y) => y.name === content.year)
      if (!yearExists) {
        // if not exists, create new year
        const newYear = await apiPost(
          "/years",
          { name: content.year },
          user.token
        )
        // add new year to school state
        dispatch({ type: "add_year", year: newYear })
      }
      const createdClass = await apiPost("/classes", content, user.token)
      dispatch({ type: "add_class", class: createdClass })

      nav("/account/classes")
    } catch (e) {
      // if POST request failed, show toast message
      console.error(e)
      toast.warn("Class creation failed. Please check input and try again")
    }
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
              onChange={(e) => handleInputChange({ year: e.target.value })}
              type="number"
            />
          </Form.Group>
          <Form.Group controlId="formClass" as={Col}>
            <Form.Label>Class</Form.Label>
            <Form.Control
              value={content.name}
              onChange={(e) => handleInputChange({ name: e.target.value })}
              type="text"
            />
          </Form.Group>
        </Row>
        <Row className="text-center mt-4">
          <Col>
            <Button as={Link} to={"/account/classes"}>
              Cancel & Back to Account
            </Button>
          </Col>
          <Col>
            <Button type="submit">Save</Button>
          </Col>
        </Row>
      </Form>
      <ToastWarning />
    </Container>
  )
}

export default AddClass
