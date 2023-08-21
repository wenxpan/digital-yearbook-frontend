import React from "react"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import { Link } from "react-router-dom"

const NavBar = ({ isLoggedIn = false, isAdmin = false }) => {
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
        <Link to="/account">Student Name</Link>
      </Navbar.Text>
      <Nav.Link as={Link} to="/classes/1">
        My yearbook
      </Nav.Link>
      <Nav.Link as={Link} to="/classes">
        All yearbooks
      </Nav.Link>
      <Nav.Link as={Link} to="/students/1/edit">
        Update profile
      </Nav.Link>
    </>
  )

  const adminView = (
    <>
      <Navbar.Text>
        <Link to="/account">Admin Name</Link>
      </Navbar.Text>
      <Nav.Link as={Link} to="/classes/1">
        Invite
      </Nav.Link>
      <Nav.Link as={Link} to="/admin/classes">
        Classes
      </Nav.Link>
      <Nav.Link as={Link} to="/admin/students">
        Students
      </Nav.Link>
      <Nav.Link as={Link} to="/classes">
        Yearbooks
      </Nav.Link>
    </>
  )

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src="/src/assets/yearbook-logo.svg"
            width="40"
            height="40"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="me-auto">
            {isLoggedIn ? (isAdmin ? adminView : studentView) : defaultView}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar
