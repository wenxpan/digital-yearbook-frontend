import React from "react"
import Stack from "react-bootstrap/Stack"
import Button from "react-bootstrap/Button"
import { Link } from "react-router-dom"

const RedirectMessage = () => {
  const msgHeading = "Success"
  const msgText = "Profile reset successfully."
  const back = "Home"
  const jumpLink = "/"

  return (
    <Stack className="m-3" gap={2}>
      <h1>{msgHeading}</h1>
      <p>{msgText}</p>
      <Button as={Link} to={jumpLink} className="me-auto">
        Back to {back}
      </Button>
    </Stack>
  )
}

export default RedirectMessage
