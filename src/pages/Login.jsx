import React, { useState } from "react"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const nav = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  function handleSubmit() {
    console.log({ email, password })
  }

  return (
    <>
      <Form className="col-md-5 bg-dark px-5 py-3 bg-opacity-50 rounded">
        <h1 className="mb-5">Log In</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <div className="mt-4 d-flex justify-content-around flex-wrap">
          <Button variant="secondary" onClick={() => nav("/login/reset")}>
            Reset Password
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Log In
          </Button>
        </div>
      </Form>
    </>
  )
}

export default Login
