import React, { useContext, useEffect, useState } from "react"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import AdminStudentCard from "../components/AdminStudentCard"
import Form from "react-bootstrap/Form"
import { Link } from "react-router-dom"
import SchoolContext from "../contexts/SchoolContext"

const ManageStudents = () => {
  // get years and classes data from context
  const { school } = useContext(SchoolContext)
  const years = school.years
  const classes = school.classes

  // set selected state for the year and class option fields
  const [selected, setSelected] = useState({
    year: years[0].year
  })

  function handleSelect(changed) {
    setSelected((prev) => ({ ...prev, ...changed }))
  }

  // every on mount and selected year changes, selected class will change accordingly
  // to make sure it's from the filtered class list
  useEffect(() => {
    const filteredClasses = classes.filter(
      (cls) => cls.year.year === selected.year
    )
    handleSelect({ class: filteredClasses[0].name })
  }, [selected.year])

  // filter students from the selected year and class
  const students = school.students.filter((s) => {
    const studentClassName = classes.find((cls) => cls._id === s.class).name
    return studentClassName === selected.class
  })

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

  return (
    <>
      <Container className="mt-4">
        <Row>
          <h1 className="fs-2">Manage Students</h1>
        </Row>
        <Row className="mt-4">
          <Row className="mb-3" xs={1} md={2}>
            <Form.Group as={Col} controlId="formYear">
              <Form.Label>Year</Form.Label>
              <Form.Select
                value={selected.year}
                onChange={(e) => {
                  handleSelect({ year: e.target.value })
                }}
              >
                {yearsOptions}
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col} controlId="formClass">
              <Form.Label>Class</Form.Label>
              <Form.Select
                value={selected.class}
                onChange={(e) => {
                  handleSelect({
                    class: e.target.value
                  })
                }}
              >
                {classesOptions}
              </Form.Select>
            </Form.Group>
          </Row>
        </Row>
        <Row xs={1} md={2} lg={3} className="mt-3">
          {students.map((s) => (
            <Col className="mb-3" key={s._id}>
              <AdminStudentCard student={s} />
            </Col>
          ))}
        </Row>
        <Row xs="auto" className="mt-3">
          <Col>
            <Button as={Link} to="/account/invite">
              Add new students
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default ManageStudents
