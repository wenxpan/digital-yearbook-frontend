import React, { useState } from "react"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"

const ResetPassword = () => {
  const userEmail = "johndoe@gmail.com"
  const userQuestion = "Where did your parents first met?"
  const [content, setContent] = useState({
    email: userEmail,
    newPassword: "",
    question: userQuestion,
    answer: ""
  })

  function handleUpdate(changed) {
    return setContent((prev) => ({ ...prev, ...changed }))
  }

  function handleSubmit(e) {
    console.log(content)
  }

  return (
    <Form className="col-md-5 bg-dark px-5 py-3 my-2 bg-opacity-50 rounded">
      <h1 className="mb-5">Reset Password</h1>
      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" value={content.email} disabled />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formQuestion">
        <Form.Label>Security Question</Form.Label>
        <Form.Control type="text" value={content.question} disabled />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formAnswer">
        <Form.Label>Answer</Form.Label>
        <Form.Control
          type="text"
          value={content.answer}
          onChange={(e) => handleUpdate({ answer: e.target.value })}
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
      <Button variant="primary" onClick={(e) => handleSubmit(e)}>
        Submit
      </Button>
    </Form>
  )
}

export default ResetPassword
