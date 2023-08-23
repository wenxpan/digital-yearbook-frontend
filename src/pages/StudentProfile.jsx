import React from "react"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"
import ListGroup from "react-bootstrap/ListGroup"
import { useNavigate } from "react-router-dom"

const StudentProfile = ({ student }) => {
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
  const nav = useNavigate()
  const questions = [
    { name: "Cras justo odio Dapibus ac facilisis in?", answer: questionOne },
    { name: "In orci orci, convallis non arcu id?", answer: questionTwo },
    { name: "Integer non eros ut metus imperdiet?", answer: questionThree },
    { name: "Etiam a tincidunt est, in semper odio?", answer: questionFour }
  ]
  const sampleQuestionEl = (
    <>
      <strong>
        <em>Cras justo odio Dapibus ac facilisis in?</em>
      </strong>
      <br />
      {questionOne}
    </>
  )
  return (
    <>
      <Container fluid="md" className="mt-4">
        <Row lg={2} className="justify-content-around">
          <Col lg="auto">
            <Card className="border-0" style={{ width: "18rem" }}>
              <Card.Img variant="top" src={photo} />
              <Card.Body>
                <Card.Title>
                  {firstName} {lastName}
                </Card.Title>
                <Card.Text className="fst-italic">{quote}</Card.Text>
                <Card.Text>Contact details: {contactDetails}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col className="align-self-center">
            <Card className="border-0">
              <ListGroup variant="flush">
                {questions.map((q) => (
                  <ListGroup.Item>
                    <strong>
                      <em>{q.name}</em>
                    </strong>
                    <br />
                    {q.answer}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col />
          <Col md="auto">
            <Button onClick={() => nav(`/classes/${student.class}`)}>
              Back
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default StudentProfile
