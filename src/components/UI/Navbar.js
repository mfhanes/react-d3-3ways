import React from "react"
import { Navbar, Nav } from "react-bootstrap"
import { NavLink } from "react-router-dom"

export default props => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={NavLink} to="/d3">
            D3 Focused
          </Nav.Link>
          <Nav.Link as={NavLink} to="/react">
            React Focused
          </Nav.Link>
          <Nav.Link as={NavLink} to="/hybrid">
            Hybrid
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
