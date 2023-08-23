import React from "react"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"
import ListGroup from "react-bootstrap/ListGroup"
import { Link } from "react-router-dom"

const Account = ({ img = "/src/assets/profile-placeholder.jpg" }) => {
  const isAdmin = true

  const studentOptions = [
    { option: `My yearbook (${"class name"})`, link: `/classes/${1}` },
    { option: "All yearbooks", link: "/classes" },
    { option: "Update Profile", link: `/students/${1}/edit` }
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
  return (
    <>
      <Container fluid="md" className="mt-4">
        <Row lg={2} className="justify-content-around">
          <Col lg="auto">
            <Card className="border-0" style={{ width: "18rem" }}>
              <Card.Img variant="top" src={img} />
              <Card.Body>
                <Card.Title>Name</Card.Title>
                <Card.Text>{isAdmin ? "Admin" : "Student"}</Card.Text>
                {!isAdmin && <Card.Text>Year - Class</Card.Text>}
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
