import React from "react"
import { Link } from "react-router-dom"
import Stack from "react-bootstrap/Stack"
import Button from "react-bootstrap/Button"

const RedirectMessage = ({ type }) => {
  const allMessages = {
    notFound: {
      msgHeading: "Page not found",
      msgText: "Please return to home page",
      button: "Home",
      jumpLink: "/"
    },
    userError: {
      msgHeading: "Re-login required",
      msgText: "Something went wrong. Please log in and try again",
      button: "Log in",
      jumpLink: "/login"
    }
  }

  const message = allMessages[type]

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
