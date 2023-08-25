import React, { useState, useContext } from "react"
import { Link } from "react-router-dom"

import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"

import SchoolContext from "../contexts/SchoolContext"
import AdminClassCard from "../components/AdminClassCard"

const ManageClasses = () => {
  const { school } = useContext(SchoolContext)
  const classes = school.classes

  function handleAddClass() {}

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
