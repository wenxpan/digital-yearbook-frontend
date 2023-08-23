import React from "react"
import Card from "react-bootstrap/Card"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { useNavigate } from "react-router-dom"

const ProfileCard = ({
  img = "/src/assets/profile-placeholder.jpg",
  student
}) => {
  const nav = useNavigate()
  const { firstName, lastName, quote } = student
  const name = firstName + lastName
  return (
    <Row className="mb-4">
      <Col className="d-flex justify-content-center">
        <Card
          style={{ width: "15rem", cursor: "pointer" }}
          className="my-2"
          onClick={() => nav(`/students/${1}`)}
        >
          <Card.Img variant="top" src={img} />
          <Card.Body>
            <Card.Text>{name}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col className="mt-2 d-flex justify-content-center align-items-center">
        <p style={{ maxWidth: "15rem" }}>{quote}</p>
      </Col>
    </Row>
  )
}

export default ProfileCard
