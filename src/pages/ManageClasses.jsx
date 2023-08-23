import React from "react"
import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import AdminStudentCard from "../components/AdminStudentCard"

const ManageClasses = () => {
  return (
    <>
      <Container className="mt-2">
        <AdminStudentCard />
      </Container>
    </>
  )
}

export default ManageClasses
