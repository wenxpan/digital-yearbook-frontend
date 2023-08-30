import React, { useState, useContext } from "react"
import { toast } from "react-toastify"

import Form from "react-bootstrap/Form"
import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import ToastWarning from "../components/ToastWarning"

import SchoolContext from "../contexts/SchoolContext"
import UserContext from "../contexts/UserContext"
import { apiDelete, apiPost, apiPut } from "../utils/apiHelper"

const AdminClassCard = ({ classInfo }) => {
  const [isEditing, setIsEditing] = useState(false)
  const { school, dispatch } = useContext(SchoolContext)
  const { user } = useContext(UserContext)

  const [content, setContent] = useState(classInfo)

  const totalStudents = school.students.filter(
    (s) => s.class === content._id
  ).length

  function handleInputChange(changed) {
    setContent((prev) => ({ ...prev, ...changed }))
  }

  async function handleSave() {
    try {
      // if year is not in database, create new year
      const yearExists = school.years.find(
        (year) => year.name === content.year.name
      )
      if (!yearExists) {
        const newYear = await apiPost(
          "/years",
          { name: content.year.name },
          user.token
        )
        // add new year to school state
        dispatch({ type: "add_year", year: newYear })
      }
      // update class
      const updatedClass = await apiPut(
        `/classes/${classInfo._id}`,
        {
          name: content.name,
          year: { name: content.year.name }
        },
        user.token
      )
      // add new class to school state
      dispatch({ type: "update_class", class: updatedClass })
      setIsEditing((prev) => !prev)
    } catch (e) {
      // if POST or PUT request failed, show toast message
      console.error(e)
      toast.warn("Class update failed. Please check input and try again")
    }
  }

  function handleEditCancel() {
    if (isEditing) {
      setContent(classInfo)
    }
    setIsEditing((prev) => !prev)
  }

  async function handleDelete() {
    // send DELETE request
    try {
      const res = await apiDelete(`/classes/${classInfo._id}`, user.token)
      if (res.status == 200) {
        // if delete success, update school state
        dispatch({ type: "delete_class", classId: classInfo._id })
      }
    } catch (e) {
      console.error(e)
      toast.warn("Deletion failed, please try again later")
    }
  }

  return (
    <Card style={{ maxWidth: "25rem" }} className="p-3">
      <Row className="mb-2">
        <Col>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Year</Form.Label>
            <Form.Control
              value={content.year.name}
              disabled={isEditing ? "" : "disabled"}
              onChange={(e) =>
                handleInputChange({ year: { name: e.target.value } })
              }
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Class</Form.Label>
            <Form.Control
              value={content.name}
              onChange={(e) => handleInputChange({ name: e.target.value })}
              disabled={isEditing ? "" : "disabled"}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <p className="fw-semibold">Total Students</p>
          <p>{totalStudents}</p>
        </Col>
        <Col></Col>
      </Row>
      <Row>
        <Col xs={6}>
          <Button
            variant="danger"
            onClick={handleDelete}
            disabled={totalStudents ? "disabled" : ""}
          >
            Delete
          </Button>
        </Col>
        <Col xs={3}>
          <Button
            variant={isEditing ? "secondary" : "primary"}
            onClick={handleEditCancel}
          >
            {isEditing ? "Cancel" : "Edit"}
          </Button>
        </Col>
        {isEditing && (
          <Col xs={3}>
            <Button onClick={handleSave}>Save</Button>
          </Col>
        )}
      </Row>
      <ToastWarning />
    </Card>
  )
}

export default AdminClassCard
