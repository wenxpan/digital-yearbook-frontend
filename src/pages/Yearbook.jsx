import React, { useContext } from "react"
import ProfileCard from "../components/ProfileCard"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import { useNavigate } from "react-router-dom"
import SchoolContext from "../contexts/SchoolContext"

const Yearbook = ({ yearbook }) => {
  const nav = useNavigate()

  const { school } = useContext(SchoolContext)
  const students = school.students.filter((s) => s.class === yearbook._id)
  // console.log(students)
  return (
    <Container fluid="md" className="text-md-center mt-4">
      <Row>
        <Col>
          <h1>{yearbook.name}</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2 className="fs-3">{yearbook.year.year}</h2>
        </Col>
      </Row>
      <Row md={2} lg={3} xl={4} className="mt-3">
        {students.map((s) => (
          <Col key={s._id}>
            <ProfileCard
              student={s}
            />
          </Col>
        ))}
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
