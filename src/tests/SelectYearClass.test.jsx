import React from "react"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import userEvent from "@testing-library/user-event"
import SelectYearClass from "../components/SelectYearClass"
import SchoolContext from "../contexts/SchoolContext"

const mockedSchool = {
  years: [
    { _id: "1", name: "Year 1" },
    { _id: "2", name: "Year 2" }
  ],
  classes: [
    { _id: "1", name: "Class 1", year: { name: "Year 1" } },
    { _id: "2", name: "Class 2", year: { name: "Year 2" } }
  ]
}

const mockSelected = {
  year: "Year 1",
  class: "Class 1"
}

describe("SelectYearClass component", () => {
  const setSelected = vi.fn()
  beforeEach(() => {
    render(
      <SchoolContext.Provider value={{ school: mockedSchool }}>
        <SelectYearClass selected={mockSelected} setSelected={setSelected} />
      </SchoolContext.Provider>
    )
  })

  it("renders Year and Class dropdowns populated from the context", () => {
    expect(screen.getByRole("combobox", { name: "Year" })).toBeInTheDocument()
    expect(screen.getByRole("option", { name: "Year 1" })).toBeInTheDocument()
    expect(screen.getByRole("combobox", { name: "Class" })).toBeInTheDocument()
    expect(screen.getByRole("option", { name: "Class 1" })).toBeInTheDocument()
    expect(screen.queryByRole("option", { name: "Class 2" })).toBeNull()
  })

  it("calls setSelected when user selects options", async () => {
    await userEvent.selectOptions(
      screen.getByRole("combobox", { name: "Year" }),
      screen.getByRole("option", { name: "Year 2" })
    )

    expect(setSelected).toHaveBeenCalled()
  })
})
