import React, { useState } from "react"
import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import AdminStudentCard from "../components/AdminStudentCard"
import Form from "react-bootstrap/Form"

const ManageClasses = () => {
  const students = [1, 2, 3, 4, 5]
  const years = [2020, 2021, 2022, 2023]
  const classes = ["Geecko", "Salamander", "Kangaroo", "possum"]

  const [classContent, setClassContent] = useState({
    class: classes[0],
    year: years[0]
  })

  function handleClassChange(changed) {
    setClassContent((prev) => ({ ...prev, ...changed }))
  }
  return (
    <>
      <Container className="mt-4">
        <Row>
          <h1 className="fs-2">Manage Students</h1>
        </Row>
        <Row className="mt-4">
          {/* <Form onSubmit={(e) => handleSave(e)}> */}
          <Row className="mb-3" xs={1} md={2}>
            <Form.Group as={Col} controlId="formYear">
              <Form.Label>Year</Form.Label>
              <Form.Select
                value={classContent.year}
                onChange={(e) => handleClassChange({ year: e.target.value })}
              >
                {years.map((y) => (
                  <option key={y}>{y}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col} controlId="formClass">
              <Form.Label>Class</Form.Label>
              <Form.Select
                value={classContent.class}
                onChange={(e) => handleClassChange({ class: e.target.value })}
              >
                {classes.map((y) => (
                  <option key={y}>{y}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Row>
          {/* </Form> */}
        </Row>
        <Row xs={1} md={2} lg={3} className="mt-3">
          {students.map((s) => (
            <Col className="mb-3" key={s}>
              <AdminStudentCard />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  )
}

export default ManageClasses
