import React from "react"
import { Link } from "react-router-dom"

import Container from "react-bootstrap/Container"
import ListGroup from "react-bootstrap/ListGroup"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

const StudentProfile = ({ student }) => {
  // destructure student object
  const {
    firstName,
    lastName,
    photo,
    contactDetails,
    quote,
    questionOne,
    questionTwo,
    questionThree,
    questionFour
  } = student

  const fullName = `${firstName} ${lastName}`

  // set up questions array
  const questions = [
    { name: "Cras justo odio Dapibus ac facilisis in?", answer: questionOne },
    { name: "In orci orci, convallis non arcu id?", answer: questionTwo },
    { name: "Integer non eros ut metus imperdiet?", answer: questionThree },
    { name: "Etiam a tincidunt est, in semper odio?", answer: questionFour }
  ]

  const questionsEl = questions.map((q) => (
    <ListGroup.Item key={q.name} as="li">
      <strong>
        <em>{q.name}</em>
      </strong>
      <br />
      {q.answer || "No answer yet"}
    </ListGroup.Item>
  ))

  return (
    <>
      <Container fluid="md" className="mt-4">
        <Row lg={2} className="justify-content-around">
          <Col lg="auto">
            <Card className="border-0" style={{ width: "18rem" }} as="section">
              <Card.Img
                variant="top"
                src={photo}
                alt={`headshot for student ${fullName}`}
              />
              <Card.Body>
                <Card.Title as="h2">{fullName}</Card.Title>
                <Card.Text className="fst-italic">{quote}</Card.Text>
                <Card.Text>
                  Contact details: {contactDetails || "not provided"}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col className="align-self-center">
            <Card className="border-0" as="ul">
              <ListGroup variant="flush">{questionsEl}</ListGroup>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col />
          <Col md="auto">
            <Button as={Link} to={`/classes/${student.class}`}>
              Back
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default StudentProfile
