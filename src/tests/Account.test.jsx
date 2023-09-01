import React from "react"
import { BrowserRouter } from "react-router-dom"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import Account from "../pages/Account"
import UserContext from "../contexts/UserContext"
import SchoolContext from "../contexts/SchoolContext"
import userEvent from "@testing-library/user-event"

describe("Account component", () => {
  it("renders admin options when user is logged in as admin", () => {
    const mockedUser = {
      isAdmin: true,
      name: "John"
    }
    const mockedSchool = {
      students: [],
      classes: []
    }
    render(
      <BrowserRouter>
        <UserContext.Provider
          value={{ loaded: true, user: mockedUser, loadEmptyUser: vi.fn() }}
        >
          <SchoolContext.Provider value={{ school: mockedSchool }}>
            <Account />
          </SchoolContext.Provider>
        </UserContext.Provider>
      </BrowserRouter>
    )

    expect(screen.getByText("Admin")).toBeInTheDocument()
    expect(
      screen.getByRole("link", { name: "Manage all classes →" })
    ).toBeInTheDocument()
  })

  it("renders student options when user is logged in as non-admin", () => {
    const mockedUser = {
      isAdmin: false,
      name: "John",
      student: "1"
    }
    const mockedSchool = {
      students: [{ _id: "1", class: "1" }],
      classes: [{ _id: "1", name: "Class 1", year: { name: "Year 1" } }]
    }
    render(
      <BrowserRouter>
        <UserContext.Provider
          value={{ loaded: true, user: mockedUser, loadEmptyUser: vi.fn() }}
        >
          <SchoolContext.Provider value={{ school: mockedSchool }}>
            <Account />
          </SchoolContext.Provider>
        </UserContext.Provider>
      </BrowserRouter>
    )

    expect(screen.getByText("Student")).toBeInTheDocument()
    expect(
      screen.getByRole("link", { name: "My yearbook (Class 1) →" })
    ).toBeInTheDocument()
  })

  it("calls handleLogOut after clicking Log Out", async () => {
    const mockedUser = {
      isAdmin: true,
      name: "John"
    }
    const mockedSchool = {
      students: [],
      classes: []
    }
    const loadEmptyUser = vi.fn()
    render(
      <BrowserRouter>
        <UserContext.Provider
          value={{ loaded: true, user: mockedUser, loadEmptyUser }}
        >
          <SchoolContext.Provider value={{ school: mockedSchool }}>
            <Account />
          </SchoolContext.Provider>
        </UserContext.Provider>
      </BrowserRouter>
    )
    await userEvent.click(screen.getByRole("link", { name: "Log Out →" }))
    expect(loadEmptyUser).toHaveBeenCalledOnce()
  })
})
