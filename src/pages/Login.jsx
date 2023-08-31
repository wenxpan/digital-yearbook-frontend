import React, { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import ToastWarning from "../components/ToastWarning"

import UserContext from "../contexts/UserContext"
import { apiPost } from "../utils/apiHelper"

const Login = () => {
  // access user context to set user data
  const { setUser } = useContext(UserContext)

  // set state for email and password inputs
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const nav = useNavigate()

  // handle login form submission
  async function handleSubmit(e) {
    e.preventDefault()
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
      toast.warn("Login failed. Please check your credentials")
    }
  }

  return (
    <>
      {/* Login form */}
      <Form
        className="col-md-5 bg-dark px-5 py-3 bg-opacity-50 rounded"
        onSubmit={(e) => handleSubmit(e)}
      >
        <h1 className="mb-5">Log In</h1>
        {/* email input */}
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            required
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
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        {/* submit button */}
        <Button className="mt-4" variant="primary" type="submit">
          Log In
        </Button>
        {/* display error message when logged in failed */}
        <ToastWarning />
      </Form>
    </>
  )
}

export default Login
