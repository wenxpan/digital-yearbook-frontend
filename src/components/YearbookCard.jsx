import React from "react"
import { Link } from "react-router-dom"

import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"

const YearbookCard = ({ yearbook }) => {
  const { year, name, _id } = yearbook
  const cardImg = "/src/assets/yearbook-placeholder.jpg"

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={cardImg} />
      <Card.Body>
        <Card.Title>{year.year}</Card.Title>
        <Button variant="primary" as={Link} to={`/classes/${_id}`}>
          {name}
        </Button>
      </Card.Body>
    </Card>
  )
}

export default YearbookCard
