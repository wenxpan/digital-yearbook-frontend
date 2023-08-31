import React from "react"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import Landing from "../pages/Landing"
import { BrowserRouter } from "react-router-dom"
import { describe, it, expect } from "vitest"

describe("Landing component", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Landing />
      </BrowserRouter>
    )
  })

  it("renders without crashing", () => {
    expect(screen.getByRole("heading", { level: 1 })).not.toBeNull()
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Digital Yearbook"
    )
    expect(screen.getByRole("heading", { level: 2 })).not.toBeNull()
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Preserving Moments"
    )
  })

  it("has a Log In button that links to /login page", () => {
    expect(screen.getByRole("button", { name: "Log In" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Log In" })).toHaveAttribute(
      "href",
      "/login"
    )
  })

  it("has a Sign Up button that links to /signup page", () => {
    expect(screen.getByRole("button", { name: "Sign Up" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Sign Up" })).toHaveAttribute(
      "href",
      "/signup"
    )
  })
})
