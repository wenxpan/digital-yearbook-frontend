import React from "react"
import { BrowserRouter } from "react-router-dom"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect } from "vitest"
import UserContext from "../contexts/UserContext"
import SignUp from "../pages/SignUp"
import * as utils from "../utils/apiHelper"
import { toast } from "react-toastify"

describe("Signup component", () => {
  let mockedSetUser = vi.fn()
  let mockedUseNavigate = vi.fn()
  beforeEach(() => {
    vi.doMock("react-router-dom", async () => {
      const actual = await vi.importActual("react-router-dom")
      return {
        ...actual,
        useNavigate: mockedUseNavigate
      }
    })
    render(
      <BrowserRouter>
        <UserContext.Provider
          value={{
            setUser: mockedSetUser
          }}
        >
          <SignUp />
        </UserContext.Provider>
      </BrowserRouter>
    )
  })
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("renders without crashing", () => {
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument()
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Sign Up"
    )
  })

  it("accepts user input and changes value", async () => {
    expect(screen.getByLabelText("Email address")).toBeInTheDocument()
    expect(screen.getByLabelText("Password")).toBeInTheDocument()

    await userEvent.type(
      screen.getByLabelText("Email address"),
      "test@example.com"
    )
    await userEvent.type(screen.getByLabelText("Password"), "password")

    expect(screen.getByLabelText("Email address")).toHaveValue(
      "test@example.com"
    )
    expect(screen.getByLabelText("Password")).toHaveValue("password")
  })

  it("calls setUser after submitting form", async () => {
    vi.spyOn(utils, "apiPost").mockResolvedValue({
      token: "fake_token",
      user: {
        email: "test@example.com",
        role: "user",
        __v: "xxxxx",
        quote: "xxx",
        studentId: ""
      }
    })

    const emailInput = screen.getByLabelText("Email address")
    const usernameInput = screen.getByLabelText("Username")
    const passwordInput = screen.getByLabelText("Password")
    const studentCodeInput = screen.getByLabelText("Student Code")
    const signUpButton = screen.getByRole("button", { name: "Sign Up" })

    await userEvent.type(emailInput, "test@example.com")
    await userEvent.type(usernameInput, "username")
    await userEvent.type(passwordInput, "password")
    await userEvent.type(studentCodeInput, "code")

    await userEvent.click(signUpButton)

    expect(mockedSetUser).toHaveBeenCalledWith({
      token: "fake_token",
      isLoggedIn: true,
      isAdmin: false,
      email: "test@example.com",
      quote: "xxx",
      studentId: ""
    })
  })

  it("shows warning message when signup failed", async () => {
    vi.spyOn(utils, "apiPost").mockRejectedValue(new Error("error"))
    const toastWarn = vi.spyOn(toast, "warn")

    const emailInput = screen.getByLabelText("Email address")
    const usernameInput = screen.getByLabelText("Username")
    const passwordInput = screen.getByLabelText("Password")
    const studentCodeInput = screen.getByLabelText("Student Code")
    const signUpButton = screen.getByRole("button", { name: "Sign Up" })

    await userEvent.type(emailInput, "test@example.com")
    await userEvent.type(usernameInput, "username")
    await userEvent.type(passwordInput, "password")
    await userEvent.type(studentCodeInput, "code")

    await userEvent.click(signUpButton)

    expect(screen.getByRole("alert")).toBeInTheDocument()

    expect(toastWarn).toHaveBeenCalledWith(
      "Sign up failed. Please check your credentials and try again"
    )
  })
})
