import React from "react"
import { BrowserRouter } from "react-router-dom"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import Yearbook from "../pages/Yearbook"
import SchoolContext from "../contexts/SchoolContext"

const mockedSchool = {
  classes: [
    {
      name: "class_name",
      _id: "class-id",
      year: { name: "year_name", _id: "year_id" }
    }
  ],
  students: [{ _id: "fake-id", class: "class-id" }]
}

describe("Yearbook component", () => {
  it("renders without crashing", () => {
    render(
      <BrowserRouter>
        <SchoolContext.Provider value={{ school: mockedSchool }}>
          <Yearbook yearbook={mockedSchool.classes[0]} />
        </SchoolContext.Provider>
      </BrowserRouter>
    )

    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument()
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "class_name"
    )
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument()
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "year_name"
    )

    expect(screen.getByRole("list")).toBeInTheDocument()
  })
})
