import React from "react"
import Card from "react-bootstrap/Card"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { useNavigate } from "react-router-dom"

const ProfileCard = ({
  img = "/src/assets/profile-placeholder.jpg",
  name = "Name",
  quote = "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
}) => {
  const nav = useNavigate()

  return (
    <Container
      className="my-2"
      onClick={() => nav(`/students/${1}`)}
      style={{ cursor: "pointer" }}
    >
      <Row>
        <Col>
          <Card style={{ width: "15rem" }}>
            <Card.Img variant="top" src={img} />
            <Card.Body>
              <Card.Text>{name}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col className="align-self-center">{quote}</Col>
      </Row>
    </Container>
  )
}

export default ProfileCard
