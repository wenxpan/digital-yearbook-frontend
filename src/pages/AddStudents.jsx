import React, { useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"

import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"

import UserContext from "../contexts/UserContext"
import AddStudentForm from "../components/AddStudentForm"
import SelectYearClass from "../components/SelectYearClass"
import { postHelper } from "../utils/apiHelper"
import SchoolContext from "../contexts/SchoolContext"

const AddStudents = () => {
  const nav = useNavigate()
  const { user } = useContext(UserContext)
  const { school, dispatch } = useContext(SchoolContext)

  // set selected state for the year and class option fields
  const [selected, setSelected] = useState({})

  // set state for entered students
  const [students, setStudents] = useState([])

  async function handleSave(e) {
    // function for submitting form
    e.preventDefault()

    // set array of students to send to server
    const newStudents = students.map((stu) => ({
      ...stu,
      class: selected.class
    }))

    // create promises for post requests
    const studentPromises = newStudents.map((student) =>
      postHelper("/students", student, user.token)
    )

    // an array of responses (student objects) from post requests
    const createdStudents = await Promise.all(studentPromises)

    // add created students to school state
    dispatch({ type: "add_students", students: createdStudents })

    // redirect to /account/students
    nav("/account/students")
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
