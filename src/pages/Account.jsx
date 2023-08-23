import React, { useContext } from "react"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"
import ListGroup from "react-bootstrap/ListGroup"
import { Link } from "react-router-dom"
import UserContext from "../contexts/UserContext"
import SchoolContext from "../contexts/SchoolContext"

const Account = () => {
  const { user } = useContext(UserContext)
  const { isAdmin, isLoggedIn, name } = user
  const { school } = useContext(SchoolContext)

  const student = school.students.find((s) => s._id === user.student)
  const yearbook = school.classes.find((c) => c._id === student.class)

  const studentOptions = [
    {
      option: `My yearbook (${yearbook.name})`,
      link: `/classes/${yearbook._id}`
    },
    { option: "All yearbooks", link: "/classes" },
    { option: "Update Profile", link: `/students/${student._id}/edit` }
  ]
  const adminOptions = [
    { option: "Add student/class", link: "invite" },
    { option: "Manage classes", link: "classes" },
    { option: "Manage students", link: "students" },
    { option: "All yearbooks", link: "/classes" }
  ]

  function handleReset() {
    // student reset profile
    console.log("reset profile clicked")
  }

  function handleLogOut() {
    //TODO - clear token and reset user
    console.log("log out clicked")
  }

  return (
    <>
      <Container fluid="md" className="mt-4">
        <Row lg={2} className="justify-content-around">
          <Col lg="auto">
            <Card className="border-0" style={{ width: "18rem" }}>
              <Card.Img variant="top" src={student.photo} />
              <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>{isAdmin ? "Admin" : "Student"}</Card.Text>
                {!isAdmin && (
                  <Card.Text>
                    {yearbook.name} - {yearbook.year.year}
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
              {isAdmin
                ? adminOptions.map((a) => (
                    <ListGroup.Item as={Link} to={a.link} key={a.option}>
                      {a.option} →
                    </ListGroup.Item>
                  ))
                : studentOptions.map((s) => (
                    <ListGroup.Item as={Link} to={s.link} key={s.option}>
                      {s.option} →
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
