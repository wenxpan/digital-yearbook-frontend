import React, { useContext } from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import YearbookCard from "../components/YearbookCard"
import Button from "react-bootstrap/Button"
import { useNavigate } from "react-router-dom"
import UserContext from "../contexts/UserContext"
import SchoolContext from "../contexts/SchoolContext"

const Classes = () => {
  const { user } = useContext(UserContext)
  const { isAdmin, isLoggedIn } = user
  const { school, dispatch } = useContext(SchoolContext)

  const nav = useNavigate()

  const classes = school.years
    .map((year) => year.classes.map((c) => ({ ...c, year: year.year })))
    .flat()
  // console.log(classes)

  return (
    <Container fluid="md" className="text-md-center mt-4">
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
      <Row>
        {classes.map((c) => (
          <Col key={c._id} md="auto" className="m-2">
            <YearbookCard yearbook={c} />
          </Col>
        ))}
      </Row>
      <Row>
        <Col />
        <Col md="auto">
          <Button onClick={() => nav("/account")}>Back</Button>
        </Col>
      </Row>
    </Container>
  )
}

export default Classes
