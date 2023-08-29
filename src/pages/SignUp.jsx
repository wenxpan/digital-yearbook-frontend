import React, { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"

import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"

import UserContext from "../contexts/UserContext"
import { apiPost } from "../utils/apiHelper"

const SignUp = () => {
  // TODO: add validation for form fields

  const nav = useNavigate()
  const { setUser } = useContext(UserContext)

  const [error, setError] = useState("")

  //TODO: responsive layout
  const [content, setContent] = useState({
    role: "user",
    name: "",
    email: "",
    password: "",
    studentId: ""
  })

  function handleUpdate(changed) {
    return setContent((prev) => ({ ...prev, ...changed }))
  }

  async function handleSubmit() {
    try {
      const { token, user: registeredUser } = await apiPost("/signup", content)
      const { __v, role, ...filteredUser } = registeredUser
      const newUser = {
        token,
        isLoggedIn: true,
        isAdmin: role === "admin" ? true : false,
        ...filteredUser
      }
      setUser(newUser)
      localStorage.setItem("user", JSON.stringify(newUser))
      // nav(`/students/${newUser.student}/edit`)
      nav("/account")
    } catch (e) {
      console.error(e)
      setError("Sign up failed. Please check your credentials and try again")
    }
  }

  return (
    <Form className="col-md-5 bg-dark px-5 py-3 my-2 bg-opacity-50 rounded">
      <h1 className="mb-5">Sign Up</h1>
      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          value={content.email}
          onChange={(e) => handleUpdate({ email: e.target.value })}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          value={content.name}
          onChange={(e) => handleUpdate({ name: e.target.value })}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={content.password}
          onChange={(e) => handleUpdate({ password: e.target.value })}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formCode">
        <Form.Label>Student Code</Form.Label>
        <Form.Control
          type="text"
          value={content.studentId}
          onChange={(e) => handleUpdate({ studentId: e.target.value })}
        />
      </Form.Group>
      <Button className="mt-4" variant="primary" onClick={handleSubmit}>
        Sign Up
      </Button>
      {/* display error message when logged in failed */}
      {error && (
        <Row className="mt-3">
          <p className="text-warning">{error}</p>
        </Row>
      )}
    </Form>
  )
}

export default SignUp
