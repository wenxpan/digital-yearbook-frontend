import React, { useContext } from "react"
import { Link } from "react-router-dom"

import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"

import SchoolContext from "../contexts/SchoolContext"
import AdminClassCard from "../components/AdminClassCard"
import AdminYearLine from "../components/AdminYearLine"

const ManageClasses = () => {
  const { school } = useContext(SchoolContext)

  const years = school.years.map((y) => {
    const noClass = school.classes.find((cls) => cls.year.name === y.name)
      ? false
      : true
    return { ...y, noClass }
  })

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
        {years.map((y) => (
          <Container key={y._id} className="p-0 my-2">
            <AdminYearLine year={y} deleteOption={y.noClass} />
            <Row xs={1} md={2} lg={3} className="mt-3">
              {school.classes.map(
                (cls) =>
                  cls.year.name === y.name && (
                    <Col className="mb-3" key={cls._id}>
                      <AdminClassCard classInfo={cls} />
                    </Col>
                  )
              )}
            </Row>
          </Container>
        ))}
        {}
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
