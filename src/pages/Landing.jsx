import React from "react"
import Button from "react-bootstrap/Button"
import { Link } from "react-router-dom"

const Landing = () => {
  return (
    <>
      <div className="mb-5">
        <h1>Digital Yearbook</h1>
        <h2 className="fs-5 mt-3 fw-normal fst-italic">
          Preserving Moments, Connecting Hearts
        </h2>
      </div>
      <Button as={Link} to="/login" className="px-4">
        Log In
      </Button>
      <p className="m-2">OR</p>
      <Button as={Link} to="/signup" className="px-4">
        Sign up
      </Button>
    </>
  )
}

export default Landing
