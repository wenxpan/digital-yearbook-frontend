import React, { useContext } from "react"
import { Link } from "react-router-dom"

import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"
import ListGroup from "react-bootstrap/ListGroup"

import UserContext from "../contexts/UserContext"
import findMatchingStudentClass from "../utils/findMatchingStudentClass"

const Account = () => {
  const { user, setUser } = useContext(UserContext)
  const { isAdmin, isLoggedIn, name } = user

  // if user is student, find out student and class object
  const [student, studentClass] = findMatchingStudentClass()

  // different options for student and admin
  const options = {
    student: [
      {
        text: `My yearbook (${studentClass.name})`,
        link: `/classes/${studentClass._id}`
      },
      { text: "All yearbooks", link: "/classes" },
      { text: "Update Profile", link: `/students/${student._id}/edit` }
    ],
    admin: [
      { text: "Add student/class", link: "invite" },
      { text: "Manage classes", link: "classes" },
      { text: "Manage students", link: "students" },
      { text: "All yearbooks", link: "/classes" }
    ]
  }

  // find out current view based on user status
  const currentOptions = isAdmin ? options.admin : options.student

  // photo to be displayed in account page
  const accountPhoto = isAdmin ? "/src/assets/admin-default.svg" : student.photo

  function handleReset() {
    //TODO - student reset profile
    console.log("reset profile clicked")
  }

  function handleLogOut() {
    //TODO - clear token and reset user
    console.log("log out clicked")
    setUser({ isLoggedIn: false, isAdmin: false })
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
      </Container>
    </>
  )
}

export default Account
