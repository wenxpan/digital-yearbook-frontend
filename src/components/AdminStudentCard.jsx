import React from "react"
import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"

const AdminStudentCard = () => {
  return (
    <Card style={{ maxWidth: "25rem" }} className="p-3">
      <Card.Text>
        <Row>
          <Col>
            First Name
            <br />
            John
          </Col>
          <Col>
            Last Name
            <br />
            Doe
          </Col>
        </Row>
      </Card.Text>
      <Card.Text>
        <Row>
          <Col>
            Email
            <br />
            john@gmail.com
          </Col>
          <Col>
            Invite Code
            <br />
            fjdalkfjdklajfekl
          </Col>
        </Row>
      </Card.Text>
      <Row className="text-center">
        <Col>
          <Button variant="danger">Delete</Button>
        </Col>
        <Col>
          <Button variant="primary">Edit</Button>
        </Col>
      </Row>
    </Card>
  )
}

export default AdminStudentCard
