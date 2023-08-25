import React from "react"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import { useNavigate } from "react-router-dom"

const YearbookCard = ({
  img = "/src/assets/yearbook-placeholder.jpg",
  yearbook
}) => {
  const nav = useNavigate()
  const { year, name, _id } = yearbook
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={img} />
      <Card.Body>
        <Card.Title>{year}</Card.Title>
        <Button variant="primary" onClick={() => nav(`/classes/${_id}`)}>
          {name}
        </Button>
      </Card.Body>
    </Card>
  )
}

export default YearbookCard
