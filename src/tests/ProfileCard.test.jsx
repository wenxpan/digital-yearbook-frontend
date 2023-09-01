import React from "react"
import { BrowserRouter } from "react-router-dom"
import "@testing-library/jest-dom"
import { render, screen, waitFor } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import userEvent from "@testing-library/user-event"
import ProfileCard from "../components/ProfileCard"

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
        <ProfileCard student={mockedStudent} />
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
        <ProfileCard student={mockedStudent} />
      </BrowserRouter>
    ).container

    await userEvent.click(container.querySelector(".card"))
    await waitFor(() =>
      expect(mockedUseNavigate).toHaveBeenCalledWith("/students/fake-id")
    )
  })
})
