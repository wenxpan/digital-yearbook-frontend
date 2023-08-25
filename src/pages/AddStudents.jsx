import React, { useState, useContext } from "react"
import { Link } from "react-router-dom"

import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"

import UserContext from "../contexts/UserContext"
import AddStudentForm from "../components/AddStudentForm"
import SelectYearClass from "../components/SelectYearClass"

const AddStudents = () => {
  const { user } = useContext(UserContext)
  const { isAdmin, isLoggedIn } = user

  // set selected state for the year and class option fields
  const [selected, setSelected] = useState({})

  // set state for entered students
  const [students, setStudents] = useState([])

  function handleSave(e) {
    // function for submitting form
    e.preventDefault()

    console.log(`class: ${selected.class}, year: ${selected.year}`)
    console.log(students)
  }

  function handleAddStudent() {
    setStudents((prev) => [
      ...prev,
      { firstName: "", lastName: "", email: "", photo: "" }
    ])
  }

  function handleStudentUpdate(obj, changed) {
    setStudents((prev) =>
      prev.map((student) =>
        student === obj ? { ...student, ...changed } : { ...student }
      )
    )
  }

  function handleStudentDelete(obj) {
    setStudents((prev) => prev.filter((s) => s !== obj))
  }

  return (
    <>
      <Container className="mt-4" fluid="md">
        <Row>
          <h1 className="fs-2">Add Students</h1>
        </Row>
        <Row className="mt-4">
          <Form onSubmit={(e) => handleSave(e)}>
            <SelectYearClass selected={selected} setSelected={setSelected} />
            {students.map((student, i) => (
              <AddStudentForm
                key={i}
                props={{
                  student,
                  index: i + 1,
                  handleStudentUpdate,
                  handleStudentDelete
                }}
              />
            ))}
            <Row xs="auto">
              <Col>
                <Button variant="primary" onClick={handleAddStudent}>
                  Add new student
                </Button>
              </Col>
            </Row>
            <Row className="text-center mt-5">
              <Col>
                <Button variant="secondary" as={Link} to="/account/">
                  Cancel
                </Button>
              </Col>
              <Col>
                <Button variant="primary" type="submit">
                  Save
                </Button>
              </Col>
            </Row>
          </Form>
        </Row>
      </Container>
    </>
  )
}

export default AddStudents
