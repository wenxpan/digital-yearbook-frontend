import React, { useContext } from "react"
import { Link } from "react-router-dom"

import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import { deleteHelper } from "../utils/apiHelper"
import SchoolContext from "../contexts/SchoolContext"
import UserContext from "../contexts/UserContext"

const AdminStudentCard = ({ student }) => {
  const { dispatch } = useContext(SchoolContext)
  const { user } = useContext(UserContext)
  async function handleDelete() {
    // send DELETE request
    const res = await deleteHelper(`/students/${student._id}`, user.token)
    console.log(res)
    if (res.status == 200) {
      // if delete success, update school state
      dispatch({ type: "delete_student", studentId: student._id })
    }
  }
  return (
    <Card style={{ maxWidth: "25rem" }} className="p-3">
      <Row className="mb-2">
        <Col>
          <p className="fw-semibold">First Name</p>
          <p>{student.firstName}</p>
        </Col>
        <Col>
          <p className="fw-semibold">Email</p>
          <p>{student.email}</p>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <p className="fw-semibold">Last Name</p>
          <p>{student.lastName}</p>
        </Col>
        <Col>
          <p className="fw-semibold">Student Id</p>
          <p>{student._id}</p>
        </Col>
      </Row>
      <Row className="text-center">
        <Col>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Col>
        <Col>
          <Button
            variant="primary"
            as={Link}
            to={`/students/${student._id}/edit`}
          >
            Edit
          </Button>
        </Col>
      </Row>
    </Card>
  )
}

export default AdminStudentCard
