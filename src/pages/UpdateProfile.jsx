import React, { useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"

import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

import UserContext from "../contexts/UserContext"
import SchoolContext from "../contexts/SchoolContext"
import SelectYearClass from "../components/SelectYearClass"
import { putHelper } from "../utils/apiHelper"

const UpdateProfile = ({ student }) => {
  const nav = useNavigate()
  const { user } = useContext(UserContext)
  const { isAdmin } = user
  const { school, dispatch } = useContext(SchoolContext)

  console.log(student)
  if (!school) {
    return <p>Loading...</p>
  }

  const studentClass = school.classes.find((c) => c._id === student.class)

  const [content, setContent] = useState(student)

  const [selected, setSelected] = useState({
    year: studentClass.year.name,
    class: studentClass.name
  })

  function handleChange(changed) {
    // to handle input update
    setContent((prev) => ({ ...prev, ...changed }))
  }

  async function handleSave(e) {
    e.preventDefault()
    const newStudent = { ...content, class: selected.class }
    const updatedStudent = await putHelper(
      `/students/${student._id}`,
      newStudent,
      user.token
    )
    dispatch({ type: "update_student", student: updatedStudent })
    nav("/account/students")
  }
  return (
    <>
      <Container className="mt-4" fluid="md">
        <Row>
          <h1 className="fs-2">Update profile</h1>
        </Row>
        <Row className="mt-4">
          <Form onSubmit={(e) => handleSave(e)}>
            <SelectYearClass
              selected={selected}
              setSelected={setSelected}
              disabled={!isAdmin ? true : false}
            />
            <Row className="mb-3" xs={1}>
              <Form.Group as={Col} controlId="formFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  value={content.firstName}
                  onChange={(e) => handleChange({ firstName: e.target.value })}
                  disabled={isAdmin ? "" : "disabled"}
                  type="text"
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  value={content.lastName}
                  onChange={(e) => handleChange({ lastName: e.target.value })}
                  disabled={isAdmin ? "" : "disabled"}
                  type="text"
                />
              </Form.Group>
            </Row>
            <Row className="mb-3" xs={1}>
              <Form.Group as={Col} controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  value={content.email}
                  onChange={(e) => handleChange({ email: e.target.value })}
                  disabled={isAdmin ? "" : "disabled"}
                  type="email"
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formPhoto">
                <Form.Label>Yearbook Photo</Form.Label>
                <Form.Control
                  value={content.photo}
                  onChange={(e) => handleChange({ photo: e.target.value })}
                  disabled={isAdmin ? "" : "disabled"}
                  type="url"
                />
              </Form.Group>
            </Row>
            <Form.Group className="mb-3 mt-5" controlId="formContact">
              <Form.Label>Contact displayed in profile</Form.Label>
              <Form.Control
                value={content.contactDetails}
                onChange={(e) =>
                  handleChange({ contactDetails: e.target.value })
                }
                type="text"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formQuote">
              <Form.Label>Yearbook quote</Form.Label>
              <Form.Control
                value={content.quote}
                onChange={(e) => handleChange({ quote: e.target.value })}
                type="text"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formQues1">
              <Form.Label>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit?
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={content.questionOne}
                onChange={(e) => handleChange({ questionOne: e.target.value })}
                type="text"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formQues2">
              <Form.Label>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit?
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={content.questionTwo}
                onChange={(e) => handleChange({ questionTwo: e.target.value })}
                type="text"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formQues3">
              <Form.Label>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit?
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={content.questionThree}
                onChange={(e) =>
                  handleChange({ questionThree: e.target.value })
                }
                type="text"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formQues4">
              <Form.Label>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit?
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={content.questionFour}
                onChange={(e) => handleChange({ questionFour: e.target.value })}
                type="text"
              />
            </Form.Group>
            <Row className="text-center">
              <Col>
                <Button
                  variant="secondary"
                  as={Link}
                  to={isAdmin ? "/account/students" : "/account"}
                >
                  Cancel
                </Button>
              </Col>
              <Col>
                <Button variant="primary" type="submit">
                  Save
                </Button>
              </Col>
            </Row>
          </Form>
        </Row>
      </Container>
    </>
  )
}

export default UpdateProfile
