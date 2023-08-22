import React from "react"
import Card from "react-bootstrap/Card"
import Container from "react-bootstrap/Container"

const ProfileCard = ({ img }) => {
  const quote = "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  return (
    <Container className="m-2">
      <Card style={{ width: "15rem" }}>
        <Card.Img variant="top" src={img} />
        <Card.Body>
          <Card.Text>Name</Card.Text>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default ProfileCard
