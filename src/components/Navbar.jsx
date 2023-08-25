import React, { useContext } from "react"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import { Link } from "react-router-dom"
import UserContext from "../contexts/UserContext"
import SchoolContext from "../contexts/SchoolContext"
import findMatchingStudentClass from "../utils/findMatchingStudentClass"

const NavBar = () => {
  const { user } = useContext(UserContext)
  const { isAdmin, isLoggedIn } = user
  const { school } = useContext(SchoolContext)

  // if user is student, find out student and class object
  const [student, studentClass] = findMatchingStudentClass()

  // set navbar text and direct links for different views
  const views = {
    default: [
      { text: "Log In", navLink: "/login" },
      { text: "Sign Up", navLink: "/signup" }
    ],
    student: [
      { text: `${user.name} - Student`, navLink: "/account" },
      { text: "My yearbook", navLink: `/classes/${studentClass._id}` },
      { text: "All yearbooks", navLink: "/classes" },
      { text: "Update profile", navLink: `/students/${student._id}/edit` }
    ],
    admin: [
      { text: `${user.name} - Admin`, navLink: "/account" },
      { text: "Invite", navLink: "/account/invite" },
      { text: "Classes", navLink: "/account/classes" },
      { text: "Students", navLink: "/account/students" },
      { text: "Yearbooks", navLink: "/classes" }
    ]
  }

  // find out current view based on logged in and admin statuses
  const currentView = isLoggedIn
    ? isAdmin
      ? views.admin
      : views.student
    : views.default

  // nav options based on current view
  const viewEl = currentView.map((option) => (
    <Nav.Link as={Link} to={option.navLink} key={option.text}>
      {option.text}
    </Nav.Link>
  ))

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand as={Link} to={isLoggedIn ? "/account" : "/"}>
          <img
            src="/src/assets/yearbook-logo.svg"
            width="40"
            height="40"
            className="d-inline-block align-top"
            alt="Yearbook logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="ml-auto">{viewEl}</Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar
