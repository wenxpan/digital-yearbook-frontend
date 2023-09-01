import React from "react"
import { BrowserRouter } from "react-router-dom"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import StudentProfile from "../pages/StudentProfile"

const mockedStudent = {
  _id: "fake-id",
  firstName: "John",
  lastName: "Doe",
  class: "fake_class_id",
  email: "example@gmail.com",
  photo: "example_image_link",
  contactDetails: "example_contact",
  questionOne: "example_answer_1",
  questionTwo: "example_answer_2",
  questionThree: "example_answer_3",
  questionFour: "example_answer_4",
  quote: "example_quote"
}

describe("StudentProfile component", () => {
  it("renders without crashing", () => {
    render(
      <BrowserRouter>
        <StudentProfile student={mockedStudent} />
      </BrowserRouter>
    )
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument()
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "John Doe"
    )
    expect(screen.getByRole("list")).toBeInTheDocument()
    expect(screen.getAllByRole("listitem")).toHaveLength(4)
  })

  it("adds placeholder text to empty fields", () => {
    const newMockedStudent = {
      ...mockedStudent,
      contactDetails: "",
      questionOne: "",
      questionTwo: "",
      questionThree: "",
      questionFour: "",
      quote: ""
    }
    render(
      <BrowserRouter>
        <StudentProfile student={newMockedStudent} />
      </BrowserRouter>
    )

    const questions = screen.getAllByRole("listitem")
    expect(questions).toHaveLength(4)
    expect(questions[0]).toHaveTextContent("No answer yet")
  })
})
