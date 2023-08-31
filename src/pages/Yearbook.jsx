import React, { useContext } from "react"
import { Link } from "react-router-dom"

import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import ProfileCard from "../components/ProfileCard"

import SchoolContext from "../contexts/SchoolContext"

const Yearbook = ({ yearbook }) => {
  const { school } = useContext(SchoolContext)
  const students = school.students.filter((s) => s.class === yearbook._id)

  return (
    <Container fluid="md" className="text-md-center mt-4">
      <Row>
        <Col>
          <h1>{yearbook.name}</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2 className="fs-3">{yearbook.year.name}</h2>
        </Col>
      </Row>
      <Row md={2} lg={3} xl={4} className="mt-3" as="ul">
        {students.map((s) => (
          <Col key={s._id}>
            <ProfileCard student={s} />
          </Col>
        ))}
      </Row>
      <Row>
        <Col />
        <Col md="auto">
          <Button as={Link} to={"/classes"}>
            Back
          </Button>
        </Col>
      </Row>
    </Container>
  )
}

export default Yearbook
