import React, { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"

import UserContext from "../contexts/UserContext"

const ResetPassword = () => {
  const { user } = useContext(UserContext)
  const nav = useNavigate()

  useEffect(() => {
    // if logged in user detected, redirect to /account page
    if (user.isLoggedIn) {
      nav("/account")
    }
  }, [user])

  const [content, setContent] = useState({
    name: "",
    email: "",
    newPassword: "",
    securityQuestion: "",
    securityAnswer: ""
  })

  function handleUpdate(changed) {
    return setContent((prev) => ({ ...prev, ...changed }))
  }

  function handleEmailCheck() {
    //TODO: query API and return security question if found
  }

  function handleSubmit() {
    //TODO:
    console.log(content)
  }

  return (
    <Form className="col-md-5 bg-dark px-5 py-3 my-2 bg-opacity-50 rounded">
      <h1 className="mb-5">Reset Password</h1>
      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" value={content.email} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formName">
        <Form.Label>Account name</Form.Label>
        <Form.Control type="email" value={content.name} />
      </Form.Group>
      <Button onClick={handleEmailCheck} className="mb-3">
        Confirm account
      </Button>
      <Form.Group className="mb-3" controlId="formQuestion">
        <Form.Label>Security Question</Form.Label>
        <Form.Control type="text" value={user.securityQuestion} disabled />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formAnswer">
        <Form.Label>Answer</Form.Label>
        <Form.Control
          type="text"
          value={content.answer}
          onChange={(e) => handleUpdate({ securityAnswer: e.target.value })}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>New Password</Form.Label>
        <Form.Control
          type="password"
          value={content.newPassword}
          onChange={(e) => handleUpdate({ newPassword: e.target.value })}
        />
      </Form.Group>
      <Button variant="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  )
}

export default ResetPassword
