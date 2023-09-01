import React from "react"
import { BrowserRouter } from "react-router-dom"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import UserContext from "../contexts/UserContext"
import SchoolContext from "../contexts/SchoolContext"
import userEvent from "@testing-library/user-event"
import AddClass from "../pages/AddClass"
import * as utils from "../utils/apiHelper"
import { toast } from "react-toastify"

const mockedUser = {
  isAdmin: true,
  token: "fake_token"
}
const mockedSchool = {
  years: [{ name: "2023" }]
}

const mockedDispatch = vi.fn()

const mockedUseNavigate = vi.fn()
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom")
  return {
    ...actual,
    useNavigate: () => mockedUseNavigate
  }
})

describe("Add Class component", () => {
  beforeEach(() =>
    render(
      <BrowserRouter>
        <UserContext.Provider value={{ loaded: true, user: mockedUser }}>
          <SchoolContext.Provider
            value={{ school: mockedSchool, dispatch: mockedDispatch }}
          >
            <AddClass />
          </SchoolContext.Provider>
        </UserContext.Provider>
      </BrowserRouter>
    )
  )

  it("renders without crashing", () => {
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument()
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Add Class"
    )
    expect(screen.getByRole("textbox", { name: "Year" })).toBeInTheDocument()
  })

  it("submits form and navigates when year exists", async () => {
    const apiPost = vi.spyOn(utils, "apiPost").mockResolvedValue({
      name: "Class 1",
      year: "2023"
    })

    const yearInput = screen.getByRole("textbox", { name: "Year" })
    const classInput = screen.getByRole("textbox", { name: "Class" })
    const saveButton = screen.getByRole("button", { name: "Save" })

    await userEvent.type(yearInput, "2023")
    await userEvent.type(classInput, "Class 1")
    await userEvent.click(saveButton)

    expect(apiPost).toHaveBeenCalledWith(
      "/classes",
      { name: "Class 1", year: "2023" },
      "fake_token"
    )
    expect(mockedDispatch).toHaveBeenCalledWith({
      type: "add_class",
      class: { name: "Class 1", year: "2023" }
    })
    expect(mockedUseNavigate).toHaveBeenCalledWith("/account/classes")
  })

  it("submits form and adds year when year does not exist", async () => {
    const apiPost = vi
      .spyOn(utils, "apiPost")
      .mockResolvedValueOnce({
        name: "2024"
      })
      .mockResolvedValueOnce({
        name: "Class 2",
        year: { name: "2024" }
      })

    const yearInput = screen.getByRole("textbox", { name: "Year" })
    const classInput = screen.getByRole("textbox", { name: "Class" })
    const saveButton = screen.getByRole("button", { name: "Save" })

    await userEvent.type(yearInput, "2024")
    await userEvent.type(classInput, "Class 2")
    await userEvent.click(saveButton)

    expect(apiPost).toHaveBeenCalledWith(
      "/years",
      { name: "2024" },
      "fake_token"
    )
    expect(mockedDispatch).toHaveBeenCalledWith({
      type: "add_year",
      year: { name: "2024" }
    })

    expect(apiPost).toHaveBeenCalledWith(
      "/classes",
      { name: "Class 2", year: "2024" },
      "fake_token"
    )
    expect(mockedDispatch).toHaveBeenCalledWith({
      type: "add_class",
      class: {
        name: "Class 2",
        year: { name: "2024" }
      }
    })
    expect(mockedUseNavigate).toHaveBeenCalledWith("/account/classes")
  })

  it("shows a warning toast when creation failed", async () => {
    vi.spyOn(utils, "apiPost").mockRejectedValue(new Error("Failed to add"))
    const toastWarn = vi.spyOn(toast, "warn")
    
    await userEvent.click(screen.getByText("Save"))
    expect(toastWarn).toHaveBeenCalledWith(
      "Class creation failed. Please check input and try again"
    )
  })
})
