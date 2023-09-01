import React from "react"
import { BrowserRouter } from "react-router-dom"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import NavbarLine from "../components/NavbarLine"
import UserContext from "../contexts/UserContext"
import SchoolContext from "../contexts/SchoolContext"

describe("NavbarLine component", () => {
  it("does not render when loaded is false", () => {
    render(
      <BrowserRouter>
        <UserContext.Provider value={{ loaded: false }}>
          <NavbarLine />
        </UserContext.Provider>
      </BrowserRouter>
    )

    expect(screen.queryByRole("navigation")).toBeNull()
  })

  it("renders default view when user is not logged in", () => {
    render(
      <BrowserRouter>
        <UserContext.Provider
          value={{ loaded: true, user: { isLoggedIn: false, isAdmin: false } }}
        >
          <SchoolContext.Provider value={{}}>
            <NavbarLine />
          </SchoolContext.Provider>
        </UserContext.Provider>
      </BrowserRouter>
    )

    expect(screen.getByRole("navigation")).toBeInTheDocument()
    expect(screen.getByText("Log In")).toBeInTheDocument()
    expect(screen.getByText("Sign Up")).toBeInTheDocument()
  })

  it("renders student view when user is logged in as non-admin", () => {
    const mockedSchool = {
      students: [{ _id: "1", class: "class1" }],
      classes: [{ _id: "class1" }]
    }
    const mockedUser = {
      isLoggedIn: true,
      isAdmin: false,
      student: "1",
      name: "John"
    }
    render(
      <BrowserRouter>
        <UserContext.Provider value={{ loaded: true, user: mockedUser }}>
          <SchoolContext.Provider value={{ school: mockedSchool }}>
            <NavbarLine />
          </SchoolContext.Provider>
        </UserContext.Provider>
      </BrowserRouter>
    )

    expect(screen.getByRole("navigation")).toBeInTheDocument()
    expect(screen.queryByText("Log In")).toBeNull()
    expect(screen.getByText("John - Student")).toBeInTheDocument()
    expect(screen.getByText("My yearbook")).toBeInTheDocument()
  })

  it("renders admin view when user is logged in as admin", () => {
    const mockedUser = {
      isLoggedIn: true,
      isAdmin: true,
      name: "John"
    }
    render(
      <BrowserRouter>
        <UserContext.Provider value={{ loaded: true, user: mockedUser }}>
          <SchoolContext.Provider value={{}}>
            <NavbarLine />
          </SchoolContext.Provider>
        </UserContext.Provider>
      </BrowserRouter>
    )

    expect(screen.getByRole("navigation")).toBeInTheDocument()
    expect(screen.queryByText("Log In")).toBeNull()
    expect(screen.queryByText("My yearbook")).toBeNull()
    expect(screen.getByText("John - Admin")).toBeInTheDocument()
    expect(screen.getByText("Students")).toBeInTheDocument()
  })
})
