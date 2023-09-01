import React from "react"
import { BrowserRouter } from "react-router-dom"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import Classes from "../pages/Classes"
import SchoolContext from "../contexts/SchoolContext"

const mockedSchool = {
  classes: [
    { _id: "1", name: "Class 1", year: { name: "Year 1" } },
    { _id: "2", name: "Class 2", year: { name: "Year 2" } }
  ]
}

describe("Classes component", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <SchoolContext.Provider
          value={{
            school: mockedSchool
          }}
        >
          <Classes />
        </SchoolContext.Provider>
      </BrowserRouter>
    )
  })

  it("renders without crashing", () => {
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument()
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "All yearbooks"
    )
    expect(screen.getByText("Class 1")).toBeInTheDocument()
    expect(screen.getByText("Year 2")).toBeInTheDocument()
  })

  it("renders a Back button that links to /account", () => {
    expect(screen.getByRole("button", { name: "Back" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Back" })).toHaveAttribute(
      "href",
      "/account"
    )
  })
})
