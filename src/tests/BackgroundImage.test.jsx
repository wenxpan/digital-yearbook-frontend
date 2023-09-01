import React from "react"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import BackgroundImage from "../components/BackgroundImage"

describe("Background Image component", () => {
  it("renders without crashing", () => {
    render(<BackgroundImage />)
    expect(screen.getByTestId("background")).toHaveStyle(
      `background-image: url("/public/app-hero.jpg")`
    )
  })
})
