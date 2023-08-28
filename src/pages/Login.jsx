import React, { useState, useContext, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"

import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"

import UserContext from "../contexts/UserContext"
import { postHelper } from "../utils/apiHelper"

const Login = () => {
  // set state for email and password
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const nav = useNavigate()
  const { user, setUser } = useContext(UserContext)

  useEffect(() => {
    // if logged in user detected, redirect to /account page
    if (user.isLoggedIn) {
      nav("/account")
    }
  }, [user])

  async function handleSubmit() {
    const { token, user: loggedInUser } = await postHelper("/login", {
      email,
      password
    })
    const { __v, role, ...filteredUser } = loggedInUser
    setUser({
      token,
      isLoggedIn: true,
      isAdmin: loggedInUser.role === "admin" ? true : false,
      ...filteredUser
    })
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
          <Button variant="primary" onClick={handleSubmit}>
            Log In
          </Button>
        </div>
      </Form>
    </>
  )
}

export default Login
