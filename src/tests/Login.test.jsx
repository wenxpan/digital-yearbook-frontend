import React from "react"
import { BrowserRouter } from "react-router-dom"
import "@testing-library/jest-dom"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect } from "vitest"
import UserContext from "../contexts/UserContext"
import Login from "../pages/Login"
import * as utils from "../utils/apiHelper"
import { toast } from "react-toastify"

const mockedUseNavigate = vi.fn()
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom")
  return {
    ...actual,
    useNavigate: () => mockedUseNavigate
  }
})

describe("Login component", () => {
  let mockedSetUser = vi.fn()
  beforeEach(() => {
    render(
      <BrowserRouter>
        <UserContext.Provider
          value={{
            setUser: mockedSetUser
          }}
        >
          <Login />
        </UserContext.Provider>
      </BrowserRouter>
    )
  })

  it("renders without crashing", () => {
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument()
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Log In"
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

  it("calls setUser and redirects to /account after submitting form", async () => {
    vi.spyOn(utils, "apiPost").mockResolvedValue({
      token: "fake_token",
      user: {
        email: "test@example.com",
        role: "user",
        __v: "xxxxx",
        quote: "xxx"
      }
    })

    const emailInput = screen.getByLabelText("Email address")
    const passwordInput = screen.getByLabelText("Password")
    const logInButton = screen.getByRole("button", { name: "Log In" })

    await userEvent.type(emailInput, "test@example.com")
    await userEvent.type(passwordInput, "password")
    await userEvent.click(logInButton)
    expect(mockedSetUser).toHaveBeenCalledWith({
      token: "fake_token",
      isLoggedIn: true,
      isAdmin: false,
      email: "test@example.com",
      quote: "xxx"
    })
    await waitFor(() =>
      expect(mockedUseNavigate).toHaveBeenCalledWith("/account")
    )
  })

  it("shows warning message when login failed", async () => {
    vi.spyOn(utils, "apiPost").mockRejectedValue(new Error("error"))
    const toastWarn = vi.spyOn(toast, "warn")

    const emailInput = screen.getByLabelText("Email address")
    const passwordInput = screen.getByLabelText("Password")
    const logInButton = screen.getByRole("button", { name: "Log In" })
    await userEvent.type(emailInput, "test@example.com")
    await userEvent.type(passwordInput, "password")
    await userEvent.click(logInButton)

    expect(screen.getByRole("alert")).toBeInTheDocument()

    expect(toastWarn).toHaveBeenCalledWith(
      "Login failed. Please check your credentials"
    )
  })
})
