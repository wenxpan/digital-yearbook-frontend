import React from "react"
import Button from "react-bootstrap/Button"
import Stack from "react-bootstrap/Stack"
import { Link } from "react-router-dom"

const Landing = () => {
  return (
    <Stack gap={5} className="mx-auto">
      <div>
        <h1>Digital Yearbook</h1>
        <h2 className="fs-5 mt-3 fw-normal fst-italic">
          Preserving Moments, Connecting Hearts
        </h2>
      </div>
      <Stack className="mx-auto" gap={4}>
        <Button as={Link} to="/login" className="px-4">
          Log In
        </Button>
        <Button as={Link} to="/signup">
          Sign up
        </Button>
      </Stack>
    </Stack>
  )
}

export default Landing
