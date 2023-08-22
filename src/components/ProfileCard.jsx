import React from "react"
import Card from "react-bootstrap/Card"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

const ProfileCard = ({
  img = "/src/assets/profile-placeholder.jpg",
  name = "Name",
  quote = "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
}) => {
  return (
    <Container className="my-2">
      <Row>
        <Col>
          <Card style={{ width: "15rem" }}>
            <Card.Img variant="top" src={img} />
            <Card.Body>
              <Card.Text>{name}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>{quote}</Col>
      </Row>
    </Container>
  )
}

export default ProfileCard
