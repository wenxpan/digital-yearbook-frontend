import React, { useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import SelectYearClass from "../components/SelectYearClass"
import ToastWarning from "../components/ToastWarning"

import UserContext from "../contexts/UserContext"
import SchoolContext from "../contexts/SchoolContext"
import { apiPut } from "../utils/apiHelper"

const UpdateProfile = ({ student }) => {
  const nav = useNavigate()
  const { user } = useContext(UserContext)
  const { isAdmin } = user
  const { school, dispatch } = useContext(SchoolContext)

  // find out student's current class
  const studentClass = school.classes.find((c) => c._id === student.class)

  // state for input student
  const [content, setContent] = useState(student)

  // state for class and year selection
  const [selected, setSelected] = useState({
    year: studentClass.year.name,
    class: studentClass.name
  })

  function handleInputChange(changed) {
    setContent((prev) => ({ ...prev, ...changed }))
  }

  // certain fields will be disabled for non-admin users
  const disabledStatus = isAdmin ? "" : "disabled"

  async function handleSave(e) {
    e.preventDefault()
    try {
      // find class based on selected class and year name
      const selectedClass = school.classes.find(
        (cls) => cls.name === selected.class && cls.year.name === selected.year
      )

      // add class info to updating student
      const newStudent = { ...content, class: selectedClass._id }

      // send PUT request to /students/:id
      const updatedStudent = await apiPut(
        `/students/${student._id}`,
        newStudent,
        user.token
      )
      dispatch({ type: "update_student", student: updatedStudent })

      // direct back to student profile page
      nav(`/students/${updatedStudent._id}`)
    } catch (e) {
      // if PUT request failed, show toast message
      console.error(e)
      toast.warn("Profile update failed. Please check input and try again")
    }
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
                  onChange={(e) =>
                    handleInputChange({ firstName: e.target.value })
                  }
                  disabled={disabledStatus}
                  type="text"
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  value={content.lastName}
                  onChange={(e) =>
                    handleInputChange({ lastName: e.target.value })
                  }
                  disabled={disabledStatus}
                  type="text"
                />
              </Form.Group>
            </Row>
            <Row className="mb-3" xs={1}>
              <Form.Group as={Col} controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  value={content.email}
                  onChange={(e) => handleInputChange({ email: e.target.value })}
                  disabled={disabledStatus}
                  type="email"
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formPhoto">
                <Form.Label>Yearbook Photo</Form.Label>
                <Form.Control
                  value={content.photo}
                  onChange={(e) => handleInputChange({ photo: e.target.value })}
                  disabled={disabledStatus}
                  type="url"
                />
              </Form.Group>
            </Row>
            <Form.Group className="mb-3 mt-5" controlId="formContact">
              <Form.Label>Contact displayed in profile</Form.Label>
              <Form.Control
                value={content.contactDetails}
                onChange={(e) =>
                  handleInputChange({ contactDetails: e.target.value })
                }
                type="text"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formQuote">
              <Form.Label>Yearbook quote</Form.Label>
              <Form.Control
                value={content.quote}
                onChange={(e) => handleInputChange({ quote: e.target.value })}
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
                onChange={(e) =>
                  handleInputChange({ questionOne: e.target.value })
                }
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
                onChange={(e) =>
                  handleInputChange({ questionTwo: e.target.value })
                }
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
                  handleInputChange({ questionThree: e.target.value })
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
                onChange={(e) =>
                  handleInputChange({ questionFour: e.target.value })
                }
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
        <ToastWarning />
      </Container>
    </>
  )
}

export default UpdateProfile
