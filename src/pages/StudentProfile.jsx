import React from "react"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"
import ListGroup from "react-bootstrap/ListGroup"
import { useNavigate } from "react-router-dom"

const StudentProfile = ({
  img = "/src/assets/profile-placeholder.jpg",
  name = "Name",
  quote = "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
}) => {
  const nav = useNavigate()
  const sampleQuestionEl = (
    <>
      <strong>
        <em>Cras justo odio Dapibus ac facilisis in?</em>
      </strong>
      <br />
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque magna
      tellus, scelerisque id metus eget, varius viverra purus. Donec et egestas
      mi, quis ornare dolor. Lorem ipsum dolor sit amet, consectetur adipiscing
      elit. Aliquam condimentum ante lectus, non cursus ante laoreet sit amet.
    </>
  )
  return (
    <>
      <Container fluid="md" className="mt-4">
        <Row lg={2} className="justify-content-around">
          <Col lg="auto">
            <Card className="border-0" style={{ width: "18rem" }}>
              <Card.Img variant="top" src={img} />
              <Card.Body>
                <Card.Title>Student Name</Card.Title>
                <Card.Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col className="align-self-center">
            <Card className="border-0">
              <ListGroup variant="flush">
                <ListGroup.Item>{sampleQuestionEl}</ListGroup.Item>
                <ListGroup.Item>{sampleQuestionEl}</ListGroup.Item>
                <ListGroup.Item>{sampleQuestionEl}</ListGroup.Item>
                <ListGroup.Item>{sampleQuestionEl}</ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col />
          <Col md="auto">
            <Button onClick={() => nav(`/classes/${1}`)}>Back</Button>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default StudentProfile
