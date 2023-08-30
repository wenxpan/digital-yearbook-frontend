import React, { useContext, useState } from "react"
import { toast } from "react-toastify"

import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import ToastWarning from "../components/ToastWarning"

import { apiDelete } from "../utils/apiHelper"
import UserContext from "../contexts/UserContext"
import SchoolContext from "../contexts/SchoolContext"

const AdminYearLine = ({ year, deleteOption = false }) => {
  const { user } = useContext(UserContext)
  const { dispatch } = useContext(SchoolContext)

  async function handleDelete() {
    try {
      // delete empty year
      const res = await apiDelete(`/years/${year._id}`, user.token)
      if (res.status == 200) {
        dispatch({ type: "delete_year", yearId: year._id })
      }
    } catch (e) {
      console.error(e)
      toast.warn("Student deletion failed, please try again later")
    }
  }

  return (
    <Row xs="auto">
      <Col>
        <h2 className="fs-3">Year: {year.name}</h2>
      </Col>
      {deleteOption && (
        <Col>
          <Button onClick={handleDelete} variant="danger">
            Delete empty year
          </Button>
        </Col>
      )}
    </Row>
  )
}

export default AdminYearLine
