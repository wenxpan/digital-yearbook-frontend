import React from "react"
import ProfileCard from "../components/ProfileCard"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import { useNavigate } from "react-router-dom"

const Yearbook = () => {
  const nav = useNavigate()
  const students = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const studentEl = (
    <>
      <Container>
        <Row>
          <Col>
            <ProfileCard img={"https://i.pravatar.cc/300"} />
          </Col>
          <Col>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Col>
        </Row>
      </Container>
    </>
  )
  return (
    <Container fluid="md" className="text-md-center">
      <Row>
        <Col>
          <h1>Year</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2 className="fs-3">Class</h2>
        </Col>
      </Row>
      <Row md={2} lg={3} xl={4}>
        {students.map((s) => studentEl)}
      </Row>
      <Row>
        <Col />
        <Col md="auto">
          <Button onClick={() => nav("/classes")}>Back</Button>
        </Col>
      </Row>
    </Container>
  )
}

export default Yearbook
