import React, { useContext, useEffect } from "react"

import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

import SchoolContext from "../contexts/SchoolContext"

const SelectYearClass = ({ props }) => {
  const { handleSelect, selected, newClassYear, handleNewClassYear, addNew } =
    props
  const { school } = useContext(SchoolContext)
  const years = school.years
  const classes = school.classes

  // every on mount and selected year changes, selected class will change accordingly
  // to make sure it's from the filtered class list
  useEffect(() => {
    if (selected.year !== "_new") {
      const filteredClasses = classes.filter(
        (cls) => cls.year.year === selected.year
      )
      handleSelect({ class: filteredClasses[0].name })
    } else {
      handleSelect({ class: "_new" })
    }
  }, [selected.year])

  // show available year options
  const yearsOptions = years.map((y) => (
    <option key={y._id} value={y.year}>
      {y.year}
    </option>
  ))

  // filter classes based on selected year and return options
  const classesOptions = classes.map(
    (cls) =>
      cls.year.year === selected.year && (
        <option key={cls._id} value={cls.name}>
          {cls.name}
        </option>
      )
  )

  const newYearEl = addNew && (
    <Form.Group className="mb-3" controlId="formNewYear">
      <Form.Label className="fw-semibold">New Year</Form.Label>
      <Form.Control
        value={newClassYear.year}
        onChange={(e) => handleNewClassYear({ year: e.target.value })}
      />
    </Form.Group>
  )

  const newClassEl = addNew && (
    <Form.Group className="mb-3" controlId="formNewClass">
      <Form.Label className="fw-semibold">New Class</Form.Label>
      <Form.Control
        value={newClassYear.class}
        onChange={(e) => handleNewClassYear({ class: e.target.value })}
      />
    </Form.Group>
  )

  const newYearOption = <option value="_new">- Add new year -</option>
  const newClassOption = <option value="_new">- Add new class -</option>

  return (
    <>
      <Row className="mb-3" xs={1} md={2}>
        <Form.Group as={Col} controlId="formYear">
          <Form.Label>Year {addNew && "Select existing or add new"}</Form.Label>
          <Form.Select
            value={selected.year}
            onChange={(e) => {
              handleSelect({ year: e.target.value })
            }}
          >
            {yearsOptions}
            {addNew && newYearOption}
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId="formClass">
          <Form.Label>
            Class {addNew && "Select existing or add new"}
          </Form.Label>
          <Form.Select
            value={selected.class}
            onChange={(e) => {
              handleSelect({
                class: e.target.value
              })
            }}
          >
            {classesOptions}
            {addNew && newClassOption}
          </Form.Select>
        </Form.Group>
      </Row>
      <Row>
        <Col>{selected.year === "_new" && newYearEl}</Col>
        <Col>{selected.class === "_new" && newClassEl}</Col>
      </Row>
    </>
  )
}

export default SelectYearClass
