import React, { useState, useContext } from "react"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"
import { Link } from "react-router-dom"
import UserContext from "../contexts/UserContext"

const UpdateProfile = () => {
  //TODO: add upload photo section for admin

  const { user } = useContext(UserContext)
  const { isAdmin, isLoggedIn } = user

  const years = [2020, 2021, 2022, 2023]
  const classes = ["Geecko", "Salamander", "Kangaroo", "possum"]

  // sample data for student
  const initialStudent = {
    year: "2023",
    class: "Kangaroo",
    firstName: "John",
    lastName: "Doe",
    email: "john@gmail.com",
    photo: "http://images.google.com/",
    contactDetails: "123456670",
    questionOne: "answer1",
    questionTwo: "answer2",
    questionThree: "answer3",
    questionFour: "answer4"
  }

  const [content, setContent] = useState(initialStudent)

  // to handle input update
  function handleChange(changed) {
    setContent((prev) => ({ ...prev, ...changed }))
  }

  function handleSave(e) {
    e.preventDefault()
    console.log(content)
  }
  return (
    <>
      <Container className="mt-4" fluid="md">
        <Row>
          <h1 className="fs-2">Update profile</h1>
        </Row>
        <Row className="mt-4">
          <Form onSubmit={(e) => handleSave(e)}>
            <Row className="mb-3" xs={1} md={2}>
              <Form.Group as={Col} controlId="formYear">
                <Form.Label>Year</Form.Label>
                <Form.Select
                  value={content.year}
                  onChange={(e) => handleChange({ year: e.target.value })}
                  disabled={isAdmin ? "" : "disabled"}
                >
                  {years.map((y) => (
                    <option key={y}>{y}</option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="formClass">
                <Form.Label>Class</Form.Label>
                <Form.Select
                  value={content.class}
                  onChange={(e) => handleChange({ class: e.target.value })}
                  disabled={isAdmin ? "" : "disabled"}
                >
                  {classes.map((y) => (
                    <option key={y}>{y}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Row>

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
              <Col />
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
