import React from "react"
import { useNavigate } from "react-router-dom"

import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

const ProfileCard = ({ student }) => {
  const nav = useNavigate()

  const { firstName, lastName, quote, photo } = student
  const fullName = `${firstName} ${lastName}`

  return (
    <Row className="mb-4" xs={2} sm={1} as="li">
      <Col className="d-flex justify-content-center">
        <Card
          style={{ width: "15rem", cursor: "pointer" }}
          className="my-2"
          onClick={() => nav(`/students/${student._id}`)}
          as="section"
        >
          <Card.Img variant="top" src={photo} />
          <Card.Body>
            <Card.Title as="h5">{fullName}</Card.Title>
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
