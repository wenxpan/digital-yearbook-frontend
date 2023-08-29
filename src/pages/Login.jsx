import React, { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"

import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"

import UserContext from "../contexts/UserContext"
import { apiPost } from "../utils/apiHelper"

const Login = () => {
  // TODO: add validation for form fields

  // set state for email and password inputs
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  // set state for error message when login failed
  const [error, setError] = useState("")

  const nav = useNavigate()

  // access user context to set user data
  const { setUser } = useContext(UserContext)

  // handle login form submission
  async function handleSubmit() {
    try {
      // send login request to server, receive token and user object
      const { token, user: loggedInUser } = await apiPost("/login", {
        email,
        password
      })

      // extract relevant user data and create new user object
      const { __v, role, ...filteredUser } = loggedInUser
      const newUser = {
        token,
        isLoggedIn: true,
        isAdmin: role === "admin" ? true : false,
        ...filteredUser
      }

      // update user state
      setUser(newUser)
      // store user data in local storage
      localStorage.setItem("user", JSON.stringify(newUser))

      // navigate to account page
      nav("/account")
    } catch (e) {
      // if login failed, prompt user to try again
      setError("Login failed. Please check your credentials")
    }
  }

  return (
    <>
      {/* Login form */}
      <Form className="col-md-5 bg-dark px-5 py-3 bg-opacity-50 rounded">
        <h1 className="mb-5">Log In</h1>
        {/* email input */}
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        {/* password input */}
        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        {/* submit button */}
        <Button className="mt-4" variant="primary" onClick={handleSubmit}>
          Log In
        </Button>
        {/* display error message when logged in failed */}
        {error && (
          <Row className="mt-3">
            <p className="text-warning">{error}</p>
          </Row>
        )}
      </Form>
    </>
  )
}

export default Login
