import React, { useState, useContext, useEffect } from "react"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"
import { Link } from "react-router-dom"
import UserContext from "../contexts/UserContext"
import AddStudentForm from "../components/AddStudentForm"
import SchoolContext from "../contexts/SchoolContext"

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

  const [newClassYear, setNewClassYear] = useState({ class: "", year: "" })

  function handleSelect(changed) {
    setSelected((prev) => ({ ...prev, ...changed }))
  }

  // every on mount and selected year changes, selected class will change accordingly
  // to make sure it's from the filtered class list
  useEffect(() => {
    if (selected.year !== "_new") {
      const filteredClasses = classes.filter(
        (cls) => cls.year.year === selected.year
      )
      handleSelect({ class: filteredClasses[0].name })
    } else {
      handleSelect({ class: "_new" })
    }
  }, [selected.year])

  const yearsOptions = years.map((y) => (
    <option key={y._id} value={y.year}>
      {y.year}
    </option>
  ))

  // filter classes based on selected year and return form options
  const classesOptions = classes.map(
    (cls) =>
      cls.year.year === selected.year && (
        <option key={cls._id} value={cls.name}>
          {cls.name}
        </option>
      )
  )

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

  function handleClassChange(changed) {
    // selecting class and year
    setSelected((prev) => ({ ...prev, ...changed }))
  }

  function handleNewClassChange(changed) {
    // to set state for newly entered class and year
    setNewClassYear((prev) => ({ ...prev, ...changed }))
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

  const newYearEl = (
    <Form.Group className="mb-3">
      <Form.Label className="fw-semibold">New Year</Form.Label>
      <Form.Control
        value={newClassYear.year}
        onChange={(e) => handleNewClassChange({ year: e.target.value })}
      />
    </Form.Group>
  )

  const newClassEl = (
    <Form.Group className="mb-3">
      <Form.Label className="fw-semibold">New Class</Form.Label>
      <Form.Control
        value={newClassYear.class}
        onChange={(e) => handleNewClassChange({ class: e.target.value })}
      />
    </Form.Group>
  )

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
                <Form.Label>Year (Select existing or add new)</Form.Label>
                <Form.Select
                  value={selected.year}
                  onChange={(e) => handleClassChange({ year: e.target.value })}
                >
                  {yearsOptions}
                  <option value="_new">- Add new year -</option>
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="formClass">
                <Form.Label>Class (Select existing or add new)</Form.Label>
                <Form.Select
                  value={selected.class}
                  onChange={(e) => handleClassChange({ class: e.target.value })}
                >
                  {classesOptions}
                  <option value="_new">- Add new class -</option>
                </Form.Select>
              </Form.Group>
            </Row>
            <Row>
              <Col>{selected.year === "_new" && newYearEl}</Col>
              <Col>{selected.class === "_new" && newClassEl}</Col>
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
