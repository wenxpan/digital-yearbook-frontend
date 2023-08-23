import React from "react"
import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { useNavigate } from "react-router-dom"

const ProfileCard = ({ img = "https://i.pravatar.cc/300?img=2", student }) => {
  const nav = useNavigate()

  const { firstName, lastName, quote, photo } = student
  const name = `${firstName} ${lastName}`

  return (
    <Row className="mb-4">
      <Col className="d-flex justify-content-center">
        <Card
          style={{ width: "15rem", cursor: "pointer" }}
          className="my-2"
          onClick={() => nav(`/students/${student._id}`)}
        >
          <Card.Img variant="top" src={photo} />
          <Card.Body>
            <Card.Text>{name}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col className="mt-2 d-flex justify-content-center align-items-center">
        <p style={{ fontStyle: "italic" }}>{quote}</p>
      </Col>
    </Row>
  )
}

export default ProfileCard
