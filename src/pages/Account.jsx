import React from "react"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"
import ListGroup from "react-bootstrap/ListGroup"
import { Link, useNavigate } from "react-router-dom"

const Account = ({ img = "/src/assets/profile-placeholder.jpg" }) => {
  const isAdmin = false

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
              <ListGroup.Item as={Link} to={`/classes/${1}`}>
                My yearbook {"(class name)"} →
              </ListGroup.Item>
              <ListGroup.Item as={Link} to="/classes">
                All yearbooks →
              </ListGroup.Item>
              <ListGroup.Item as={Link} to={`/students/${1}/edit`}>
                Update profile →
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
        <Row>
          <Col />
          <Col md="auto">
            <Button variant="danger" onClick={handleReset}>
              Reset profile
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Account
