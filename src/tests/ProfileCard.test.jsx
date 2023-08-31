import React from "react"
import { BrowserRouter } from "react-router-dom"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import mockedSchool from "./mockedSchool"
import ProfileCard from "../components/ProfileCard"

describe("Profile Card component", () => {
  it("renders without crashing", () => {
    render(
      <BrowserRouter>
        <ProfileCard student={mockedSchool.mockedStudent} />
      </BrowserRouter>
    )

    expect(screen.getByRole("heading", { level: 5 })).toBeInTheDocument()
    expect(screen.getByRole("heading", { level: 5 })).toHaveTextContent(
      "John Doe"
    )
  })

  it("redirects to student profile page after clicking", async () => {
    vi.doMock("react-router-dom", async () => {
      const actual = await vi.importActual("react-router-dom")
      return {
        ...actual,
        useNavigate: mockedUseNavigate
      }
    })

    render(
      <BrowserRouter>
        <ProfileCard student={mockedSchool.mockedStudent} />
      </BrowserRouter>
    )
  })
})
