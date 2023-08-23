import React, { useContext } from "react"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import { Link } from "react-router-dom"
import UserContext from "../contexts/UserContext"
import SchoolContext from "../contexts/SchoolContext"

const NavBar = () => {
  const { user } = useContext(UserContext)
  const { isAdmin, isLoggedIn } = user
  const { school } = useContext(SchoolContext)

  const student =
    !isAdmin && school.students.find((s) => s._id === user.student)
  const yearbook =
    !isAdmin && school.classes.find((c) => c._id === student.class)

  //TODO: make 3 views DRY; replace placeholder links
  const defaultView = (
    <>
      <Nav.Link as={Link} to="/login">
        Log In
      </Nav.Link>
      <Nav.Link as={Link} to="/signup">
        Sign Up
      </Nav.Link>
    </>
  )
  const studentView = (
    <>
      <Navbar.Text>
        <Link to="/account">{user.name} - Student</Link>
      </Navbar.Text>
      <Nav.Link as={Link} to={`/classes/${yearbook._id}`}>
        My yearbook
      </Nav.Link>
      <Nav.Link as={Link} to="/classes">
        All yearbooks
      </Nav.Link>
      <Nav.Link as={Link} to={`/students/${student._id}/edit`}>
        Update profile
      </Nav.Link>
    </>
  )

  const adminView = (
    <>
      <Navbar.Text>
        <Link to="/account">{user.name} - Admin</Link>
      </Navbar.Text>
      <Nav.Link as={Link} to="/account/invite">
        Invite
      </Nav.Link>
      <Nav.Link as={Link} to="/account/classes">
        Classes
      </Nav.Link>
      <Nav.Link as={Link} to="/account/students">
        Students
      </Nav.Link>
      <Nav.Link as={Link} to="/classes">
        Yearbooks
      </Nav.Link>
    </>
  )

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
          <Nav className="ml-auto">
            {isLoggedIn ? (isAdmin ? adminView : studentView) : defaultView}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar
