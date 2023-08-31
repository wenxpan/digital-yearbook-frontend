import React from "react"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import Landing from "../pages/Landing"
import { BrowserRouter } from "react-router-dom"
import { describe, it, expect } from "vitest"

describe("Landing component", () => {
  let container
  beforeEach(() => {
    container = render(
      <BrowserRouter>
        <Landing />
      </BrowserRouter>
    ).container
  })

  it("renders without crashing", () => {
    expect(container.querySelector("h1")).not.toBeNull()
    expect(container.querySelector("h1")).toHaveTextContent("Digital Yearbook")
    expect(container.querySelector("h2")).not.toBeNull()
    expect(container.querySelector("h2")).toHaveTextContent(
      "Preserving Moments"
    )
  })

  it("has a Log In button that links to /login page", () => {
    expect(screen.getByText("Log In").closest("a")).toHaveAttribute(
      "href",
      "/login"
    )
  })

  it("navigates to /signup when Sign Up button is clicked", () => {
    expect(screen.getByText("Sign up").closest("a")).toHaveAttribute(
      "href",
      "/signup"
    )
  })
})
