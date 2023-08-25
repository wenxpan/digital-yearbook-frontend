import React, { useState, useContext } from "react"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import { Link } from "react-router-dom"
import AdminClassCard from "../components/AdminClassCard"
import SchoolContext from "../contexts/SchoolContext"

const ManageClasses = () => {
  const { school } = useContext(SchoolContext)
  const classes = school.classes

  return (
    <>
      <Container className="mt-4">
        <Row>
          <h1 className="fs-2">Manage Classes</h1>
        </Row>

        <Row xs={1} md={2} lg={3} className="mt-3">
          {classes.map((cls) => (
            <Col className="mb-3" key={cls._id}>
              <AdminClassCard classInfo={cls} />
            </Col>
          ))}
        </Row>
        <Row xs="auto" className="mt-3">
          <Col>
            <Button as={Link} to="/account/create">
              Add new class
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default ManageClasses
