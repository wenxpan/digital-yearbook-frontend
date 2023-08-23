import React, { useState, useContext } from "react"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"
import { Link } from "react-router-dom"
import UserContext from "../contexts/UserContext"
import AddStudentForm from "../components/AddStudentForm"

const AddStudents = () => {
  const { user } = useContext(UserContext)
  const { isAdmin, isLoggedIn } = user

  const years = [2020, 2021, 2022, 2023]
  const classes = ["Geecko", "Salamander", "Kangaroo", "possum"]

  const [classContent, setClassContent] = useState({
    class: classes[0],
    year: years[0]
  })
  const [students, setStudents] = useState([])

  function handleSave(e) {
    e.preventDefault()
    console.log(`class: ${classContent.class}, year: ${classContent.year}`)
    console.log(students)
  }

  function handleClassChange(changed) {
    setClassContent((prev) => ({ ...prev, ...changed }))
  }

  function handleStudentUpdate(obj, changed) {
    setStudents((prev) =>
      prev.map((student) =>
        student === obj ? { ...student, ...changed } : { ...student }
      )
    )
  }

  function handleAddStudent() {
    setStudents((prev) => [
      ...prev,
      { firstName: "", lastName: "", email: "", photo: "" }
    ])
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
              <Button variant="primary" onClick={handleAddStudent}>
                Add new student
              </Button>
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
