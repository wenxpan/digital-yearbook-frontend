import React from "react"
import { BrowserRouter } from "react-router-dom"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import Yearbook from "../pages/Yearbook"
import SchoolContext from "../contexts/SchoolContext"
import mockedSchool from "./mockedSchool"

describe("Yearbook component", () => {
  it("renders without crashing", () => {
    const mockedClass = mockedSchool.classes[0]
    render(
      <BrowserRouter>
        <SchoolContext.Provider value={{ school: mockedSchool }}>
          <Yearbook yearbook={mockedClass} />
        </SchoolContext.Provider>
      </BrowserRouter>
    )

    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument()
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      mockedClass.name
    )
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument()
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      mockedClass.year.name
    )

    expect(screen.getByRole("list")).toBeInTheDocument()
  })
})
