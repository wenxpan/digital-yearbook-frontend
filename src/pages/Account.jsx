import React, { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"
import ListGroup from "react-bootstrap/ListGroup"

import UserContext from "../contexts/UserContext"
import SchoolContext from "../contexts/SchoolContext"
import { apiPut } from "../utils/apiHelper"

const Account = () => {
  const { user, loadEmptyUser } = useContext(UserContext)
  const { school, dispatch } = useContext(SchoolContext)
  const { isAdmin, name } = user
  const [error, setError] = useState("")
  const nav = useNavigate()

  // if user is student, find out student and class object
  const student =
    !isAdmin && school.students.find((s) => s._id === user.student)
  const studentClass = student && school.classes.find((cls) => cls._id === student.class)

  // different options for student and admin
  const options = {
    student: !isAdmin && [
      {
        text: `My yearbook (${studentClass.name})`,
        link: `/classes/${studentClass._id}`
      },
      { text: "All yearbooks", link: "/classes" },
      { text: "Update Profile", link: `/students/${student._id}/edit` }
    ],
    admin: [
      { text: "Add new students", link: "students/new" },
      { text: "Add new class", link: "classes/new" },
      { text: "Manage all classes", link: "classes" },
      { text: "Manage all students", link: "students" },
      { text: "All yearbooks", link: "/classes" }
    ]
  }

  // find out current view based on user status
  const currentOptions = isAdmin ? options.admin : options.student

  // photo to be displayed in account page
  const accountPhoto = isAdmin ? "/src/assets/admin-default.svg" : student.photo

  async function handleReset() {
    // student reset their own profile
    try {
      // create new student with reset editable fields
      const resetStudent = {
        ...student,
        contactDetails: "",
        quote: "",
        questionOne: "",
        questionTwo: "",
        questionThree: "",
        questionFour: ""
      }
      // send put request and receive updated student object
      const updatedStudent = await apiPut(
        `/students/${student._id}`,
        resetStudent,
        user.token
      )
      // update student in school state
      dispatch({ type: "update_student", student: updatedStudent })
      // navigate to student profile page
      nav(`/students/${student._id}`)
    } catch (e) {
      // if reset failed, attached error message under button
      console.error(e)
      setError("Reset failed. Please try again or report to admin")
    }
  }

  function handleLogOut() {
    //clear user data in storage and reset user state
    loadEmptyUser()
    localStorage.removeItem("user")
  }

  return (
    <>
      <Container fluid="md" className="mt-4">
        <Row lg={2} className="justify-content-around">
          <Col lg="auto">
            <Card className="border-0" style={{ width: "18rem" }}>
              <Card.Img variant="top" src={accountPhoto} />
              <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>{isAdmin ? "Admin" : "Student"}</Card.Text>
                {!isAdmin && (
                  <Card.Text>
                    {studentClass.name} - {studentClass.year.name}
                  </Card.Text>
                )}
              </Card.Body>
            </Card>
          </Col>
          <Col className="align-self-center">
            <ListGroup variant="flush" as="nav">
              <ListGroup.Item disabled className="fw-bold">
                Options
              </ListGroup.Item>
              {currentOptions.map((opt) => (
                <ListGroup.Item as={Link} to={opt.link} key={opt.text}>
                  {opt.text} →
                </ListGroup.Item>
              ))}
              <br />
              <ListGroup.Item onClick={handleLogOut} as={Link}>
                Log Out →
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
        {!isAdmin && (
          <Row>
            <Col />
            <Col md="auto">
              <Button variant="danger" onClick={handleReset}>
                Reset profile
              </Button>
            </Col>
          </Row>
        )}
        {error && <p className="text-danger text-end">{error}</p>}
      </Container>
    </>
  )
}

export default Account
