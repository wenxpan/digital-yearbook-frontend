import React from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import YearbookCard from "../components/YearbookCard"

const Classes = () => {
  const yearbookEl = (
    <Col md="auto" className="m-2">
      <YearbookCard />
    </Col>
  )
  const arr = [1, 2, 3, 4, 5]
  return (
    <Container fluid="md" className="text-md-center">
      <Row>
        <Col>
          <h1>School Name</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2 className="">All yearbooks</h2>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        {arr.map((a) => yearbookEl)}
      </Row>
    </Container>
  )
}

export default Classes
