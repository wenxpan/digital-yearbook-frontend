import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"

import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import ToastWarning from "../components/ToastWarning"

import SchoolContext from "../contexts/SchoolContext"
import UserContext from "../contexts/UserContext"
import { apiDelete } from "../utils/apiHelper"

const AdminStudentCard = ({ student }) => {
  const { dispatch } = useContext(SchoolContext)
  const { user } = useContext(UserContext)

  async function handleDelete() {
    try {
      // send DELETE request
      const res = await apiDelete(`/students/${student._id}`, user.token)
      console.log(res)
      if (res.status == 200) {
        // if delete success, update school state
        dispatch({ type: "delete_student", studentId: student._id })
      }
    } catch (e) {
      console.error(e)
      toast.warn("Student deletion failed, please try again later")
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
      <ToastWarning />
    </Card>
  )
}

export default AdminStudentCard
