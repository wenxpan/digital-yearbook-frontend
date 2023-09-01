import React from "react"
import { BrowserRouter } from "react-router-dom"
import "@testing-library/jest-dom"
import { render, screen, waitFor } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import userEvent from "@testing-library/user-event"
import mockedSchool from "./mockedSchool"
import ProfileCard from "../components/ProfileCard"

const mockedUseNavigate = vi.fn()
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom")
  return {
    ...actual,
    useNavigate: () => mockedUseNavigate
  }
})

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
    expect(screen.getByText("example_quote")).toBeInTheDocument()
  })

  it("redirects to student profile page after clicking", async () => {
    const container = render(
      <BrowserRouter>
        <ProfileCard student={mockedSchool.mockedStudent} />
      </BrowserRouter>
    ).container

    await userEvent.click(container.querySelector(".card"))
    await waitFor(() =>
      expect(mockedUseNavigate).toHaveBeenCalledWith("/students/fake-id")
    )
  })
})
