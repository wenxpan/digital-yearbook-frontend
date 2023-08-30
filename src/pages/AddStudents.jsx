import React, { useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import SelectYearClass from "../components/SelectYearClass"
import ToastWarning from "../components/ToastWarning"
import AddStudentForm from "../components/AddStudentForm"

import UserContext from "../contexts/UserContext"
import SchoolContext from "../contexts/SchoolContext"
import { apiPost } from "../utils/apiHelper"

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

    try {
      // check for selected class based on year and class name
      const selectedClass = school.classes.find(
        (cls) => cls.name === selected.class && cls.year.name === selected.year
      )

      // set array of students to send to server
      const newStudents = students.map((stu) => ({
        ...stu,
        class: selectedClass._id
      }))
      // create promises for post requests
      const studentPromises = newStudents.map((student) =>
        apiPost("/students", student, user.token)
      )

      // an array of responses (student objects) from post requests
      const createdStudents = await Promise.all(studentPromises)

      // add created students to school state
      dispatch({ type: "add_students", students: createdStudents })

      // redirect to /account/students
      nav("/account/students")
    } catch (e) {
      // if POST request failed, show toast message
      console.error(e)
      toast.warn("Student creation failed. Please check input and try again")
    }
  }

  function handleAddStudent() {
    // add a new object with empty values to students state
    setStudents((prev) => [
      ...prev,
      { firstName: "", lastName: "", email: "", photo: "" }
    ])
  }

  function handleStudentUpdate(obj, changed) {
    // update matched student in students state
    setStudents((prev) =>
      prev.map((student) =>
        student === obj ? { ...student, ...changed } : { ...student }
      )
    )
  }

  function handleStudentDelete(obj) {
    // delete matched student in state
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
        <ToastWarning />
      </Container>
    </>
  )
}

export default AddStudents
