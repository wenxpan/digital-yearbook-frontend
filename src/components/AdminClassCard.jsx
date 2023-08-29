import React, { useState, useContext } from "react"
import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import SchoolContext from "../contexts/SchoolContext"
import { apiDelete, apiPost, apiPut } from "../utils/apiHelper"
import UserContext from "../contexts/UserContext"

const AdminClassCard = ({ classInfo }) => {
  const [isEditing, setIsEditing] = useState(false)
  const { school, dispatch } = useContext(SchoolContext)
  const { user } = useContext(UserContext)

  const [content, setContent] = useState(classInfo)

  const totalStudents = school.students.filter(
    (s) => s.class === content._id
  ).length

  function handleChange(changed) {
    setContent((prev) => ({ ...prev, ...changed }))
  }

  async function handleSave() {
    // if year is not in database, create new year
    const yearExists = school.years.find(
      (year) => year.name === content.year.name
    )
    console.log("name", content.name, "year", content.year.name)
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
  }

  async function handleDelete() {
    // send DELETE request
    const res = await apiDelete(`/classes/${classInfo._id}`, user.token)
    if (res.status == 200) {
      // if delete success, update school state
      dispatch({ type: "delete_class", classId: classInfo._id })
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
              onChange={(e) => handleChange({ year: { name: e.target.value } })}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Class</Form.Label>
            <Form.Control
              value={content.name}
              onChange={(e) => handleChange({ name: e.target.value })}
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
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Col>
        <Col xs={3}>
          <Button
            variant={isEditing ? "secondary" : "primary"}
            onClick={() => setIsEditing((prev) => !prev)}
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
    </Card>
  )
}

export default AdminClassCard
