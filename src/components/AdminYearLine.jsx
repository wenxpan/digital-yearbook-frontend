import React, { useContext, useState } from "react"
import { Button } from "react-bootstrap"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { deleteHelper } from "../utils/apiHelper"
import UserContext from "../contexts/UserContext"
import SchoolContext from "../contexts/SchoolContext"

const AdminYearLine = ({ year, deleteOption = false }) => {
  const { user } = useContext(UserContext)
  const { dispatch } = useContext(SchoolContext)
  async function handleDelete() {
    // delete empty year
    const res = await deleteHelper(`/years/${year._id}`, user.token)
    dispatch({ type: "delete_year", yearId: year._id })
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
