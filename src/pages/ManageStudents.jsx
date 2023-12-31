import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"

import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import AdminStudentCard from "../components/AdminStudentCard"
import SelectYearClass from "../components/SelectYearClass"

import SchoolContext from "../contexts/SchoolContext"

const ManageStudents = () => {
  // get years data from context
  const { school } = useContext(SchoolContext)

  // set selected state for the year and class option fields
  const [selected, setSelected] = useState({})

  // filter students from the selected year and class
  const students = school.students.filter((s) => {
    const studentClassName = school.classes.find(
      (cls) => cls._id === s.class
    )?.name
    return studentClassName === selected.class
  })

  return (
    <>
      <Container className="mt-4">
        <Row className="mb-3">
          <h1 className="fs-2">Manage Students</h1>
        </Row>
        <Row className="mb-3">
          <p>Note: Deleting students will delete the linked user as well</p>
        </Row>
        <SelectYearClass selected={selected} setSelected={setSelected} />
        <Row xs={1} lg={2} xl={3} className="mt-3">
          {students.map((s) => (
            <Col className="mb-3" key={s._id}>
              <AdminStudentCard student={s} />
            </Col>
          ))}
        </Row>
        <Row xs="auto" className="mt-3">
          <Col>
            <Button as={Link} to="new">
              Add new students
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default ManageStudents
