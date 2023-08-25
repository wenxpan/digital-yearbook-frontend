import React, { useContext } from "react"
import { Link } from "react-router-dom"

import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"

import UserContext from "../contexts/UserContext"
import SchoolContext from "../contexts/SchoolContext"
import YearbookCard from "../components/YearbookCard"

const Classes = () => {
  const { user } = useContext(UserContext)
  const { isAdmin, isLoggedIn } = user
  const { school } = useContext(SchoolContext)

  return (
    <Container fluid="md" className="mt-4">
      <Row>
        <Col>
          <h2 className="">All yearbooks</h2>
        </Col>
      </Row>
      <Row className="text-md-center">
        {school.classes.map((c) => (
          <Col key={c._id} md="auto" className="my-2">
            <YearbookCard yearbook={c} />
          </Col>
        ))}
      </Row>
      <Row>
        <Col />
        <Col md="auto">
          <Button as={Link} to={"/account"}>
            Back
          </Button>
        </Col>
      </Row>
    </Container>
  )
}

export default Classes
