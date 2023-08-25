import React, { useState, useContext, useEffect } from "react"
import { Link } from "react-router-dom"

import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"

import UserContext from "../contexts/UserContext"
import SchoolContext from "../contexts/SchoolContext"
import AddStudentForm from "../components/AddStudentForm"
import SelectYearClass from "../components/SelectYearClass"

const AddStudents = () => {
  const { user } = useContext(UserContext)
  const { isAdmin, isLoggedIn } = user

  //TODO: make the following DRY; currently same as ManageStudent
  // get years and classes data from context
  const { school } = useContext(SchoolContext)
  const years = [...school.years]
  const classes = [...school.classes]

  // set selected state for the year and class option fields
  const [selected, setSelected] = useState({
    year: years[0].year
  })

  function handleSelect(changed) {
    setSelected((prev) => ({ ...prev, ...changed }))
  }

  const [newClassYear, setNewClassYear] = useState({ class: "", year: "" })

  function handleNewClassYear(changed) {
    // to set state for newly entered class and year
    setNewClassYear((prev) => ({ ...prev, ...changed }))
  }

  const [students, setStudents] = useState([])

  function handleSave(e) {
    // function for submitting form
    e.preventDefault()

    console.log(
      `class: ${
        selected.class !== "_new" ? selected.class : newClassYear.class
      }, year: ${selected.year !== "_new" ? selected.year : newClassYear.year}`
    )
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
            <SelectYearClass
              props={{
                selected,
                handleSelect,
                newClassYear,
                handleNewClassYear,
                addNew: true
              }}
            />
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

//TODO: explore upload file and post to database
const uploadPhoto = (
  <Form.Group controlId="formFile" className="mb-3">
    <Form.Label>Upload yearbook photo</Form.Label>
    <Form.Control
      onChange={(e) => handleChange({ photo: e.target.files[0] })}
      type="file"
    />
  </Form.Group>
)

export default AddStudents
