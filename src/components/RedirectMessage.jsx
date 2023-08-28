import React from "react"
import Stack from "react-bootstrap/Stack"
import Button from "react-bootstrap/Button"
import { Link } from "react-router-dom"

const RedirectMessage = (type) => {
  const message = {
    msgHeading: "Page not found",
    msgText: "Please return to home page",
    button: "Home",
    jumpLink: "/"
  }

  return (
    <Stack className="m-3" gap={2}>
      <h1>{message.msgHeading}</h1>
      <p>{message.msgText}</p>
      <Button as={Link} to={message.jumpLink} className="me-auto">
        Back to {message.button}
      </Button>
    </Stack>
  )
}

export default RedirectMessage
