import React, { useState, useContext, useEffect } from "react"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import { useNavigate } from "react-router-dom"
import UserContext from "../contexts/UserContext"

const SignUp = () => {
  const nav = useNavigate()
  const { user } = useContext(UserContext)

  useEffect(() => {
    if (user.isLoggedIn) {
      nav("/account")
    }
  }, [user])

  //TODO: responsive layout
  const [content, setContent] = useState({
    email: "",
    password: "",
    question: "",
    answer: "",
    code: ""
  })

  function handleUpdate(changed) {
    return setContent((prev) => ({ ...prev, ...changed }))
  }

  function handleSubmit() {
    console.log(content)
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
      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={content.password}
          onChange={(e) => handleUpdate({ password: e.target.value })}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formQuestion">
        <Form.Label>Security Question</Form.Label>
        <Form.Control
          type="text"
          value={content.question}
          onChange={(e) => handleUpdate({ question: e.target.value })}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formAnswer">
        <Form.Label>Answer</Form.Label>
        <Form.Control
          type="text"
          value={content.answer}
          onChange={(e) => handleUpdate({ answer: e.target.value })}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formCode">
        <Form.Label>Invite Code</Form.Label>
        <Form.Control
          type="text"
          value={content.code}
          onChange={(e) => handleUpdate({ code: e.target.value })}
        />
      </Form.Group>
      <Button variant="primary" onClick={handleSubmit}>
        Sign Up
      </Button>
    </Form>
  )
}

export default SignUp
