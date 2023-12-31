import React, { useContext } from "react"
import { Link } from "react-router-dom"

import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import AdminYearLine from "../components/AdminYearLine"
import AdminClassCard from "../components/AdminClassCard"

import SchoolContext from "../contexts/SchoolContext"

const ManageClasses = () => {
  const { school } = useContext(SchoolContext)

  // check empty classes for years and add as property
  const years = school.years.map((y) => {
    // a year can be deleted when noClass is true
    const noClass = !school.classes.find((cls) => cls.year.name === y.name)
    return { ...y, noClass }
  })

  // class cards for one year
  const mapClassesToYear = (y) =>
    school.classes.map(
      (cls) =>
        cls.year?.name === y.name && (
          <Col className="mb-3" key={cls._id}>
            <AdminClassCard classInfo={cls} />
          </Col>
        )
    )

  // all years elements
  const yearsEl = years.map((y) => (
    <Container key={y._id} className="p-0 my-2">
      <AdminYearLine year={y} deleteOption={y.noClass} />
      <Row xs={1} md={2} lg={3} className="mt-3">
        {mapClassesToYear(y)}
      </Row>
    </Container>
  ))

  return (
    <>
      <Container className="mt-4">
        <Row className="mb-3">
          <h1 className="fs-2">Manage Classes</h1>
        </Row>
        <Row className="mb-3">
          <p>
            Note: Only classes without students and empty years without classes
            can be deleted.
          </p>
        </Row>
        {yearsEl}
        <Row xs="auto" className="mt-3">
          <Col>
            <Button as={Link} to={"new"}>
              Add new class
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default ManageClasses
