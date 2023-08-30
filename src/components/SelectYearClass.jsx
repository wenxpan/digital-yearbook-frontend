import React, { useContext, useEffect } from "react"

import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

import SchoolContext from "../contexts/SchoolContext"

const SelectYearClass = ({ selected, setSelected, disabled = false }) => {
  const { school } = useContext(SchoolContext)
  const { years, classes } = school

  // every on mount, set initial year state
  useEffect(() => {
    if (!selected.year && years) {
      handleSelect({ year: years[0].name })
    }
  }, [])

  // every on mount and selected year changes, selected class will change accordingly
  // to make sure it's from the filtered class list
  useEffect(() => {
    if (classes) {
      const filteredClasses = classes.filter(
        (cls) => cls.year.name === (selected.year || years[0].name)
      )
      handleSelect({ class: filteredClasses[0]?.name })
    }
  }, [selected.year])

  // show available year options
  const yearsOptions = years.map((y) => (
    <option key={y._id} value={y.name}>
      {y.name}
    </option>
  ))

  // filter classes based on selected year and return options
  const classesOptions = classes.map(
    (cls) =>
      cls.year.name === selected.year && (
        <option key={cls._id} value={cls.name}>
          {cls.name}
        </option>
      )
  )

  function handleSelect(changed) {
    setSelected((prev) => ({ ...prev, ...changed }))
  }

  return (
    <>
      <Row className="mb-3" xs={1} md={2}>
        <Form.Group as={Col} controlId="formYear">
          <Form.Label>Year</Form.Label>
          <Form.Select
            disabled={disabled ? "disabled" : ""}
            value={selected.year}
            onChange={(e) => {
              handleSelect({ year: e.target.value })
            }}
          >
            {yearsOptions}
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId="formClass">
          <Form.Label>Class</Form.Label>
          <Form.Select
            value={selected.class}
            disabled={disabled ? "disabled" : ""}
            onChange={(e) => {
              handleSelect({
                class: e.target.value
              })
            }}
          >
            {classesOptions}
          </Form.Select>
        </Form.Group>
      </Row>
    </>
  )
}

export default SelectYearClass
