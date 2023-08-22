import React from "react"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import { useNavigate } from "react-router-dom"

const YearbookCard = ({
  img = "https://picsum.photos/200/100",
  year = 2009
}) => {
  const nav = useNavigate()
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={img} />
      <Card.Body>
        <Card.Title>{year}</Card.Title>
        <Button variant="primary" onClick={() => nav(`/classes/${1}`)}>
          View yearbook
        </Button>
      </Card.Body>
    </Card>
  )
}

export default YearbookCard
