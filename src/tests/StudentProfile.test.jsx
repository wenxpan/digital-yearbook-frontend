import React from "react"
import { BrowserRouter } from "react-router-dom"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import StudentProfile from "../pages/StudentProfile"
import mockedSchool from "./mockedSchool"

describe("StudentProfile component", () => {
  it("renders without crashing", () => {
    const mockedStudent = mockedSchool.mockedStudent

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
    const mockedStudent = {
      ...mockedSchool.mockedStudent,
      contactDetails: "",
      questionOne: "",
      questionTwo: "",
      questionThree: "",
      questionFour: "",
      quote: ""
    }
    render(
      <BrowserRouter>
        <StudentProfile student={mockedStudent} />
      </BrowserRouter>
    )

    const questions = screen.getAllByRole("listitem")
    expect(questions).toHaveLength(4)
    expect(questions[0]).toHaveTextContent("No answer yet")
  })
})
