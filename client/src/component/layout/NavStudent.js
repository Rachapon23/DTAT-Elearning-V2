import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import './Nav.css'

import { useNavigate } from "react-router-dom";
const NavStudent = () => {

  const navigate = useNavigate();


  const logout = () => {

    sessionStorage.clear()
    localStorage.clear()
    navigate("/");
  };
  // console.log(user)
  return (
    <Navbar className="bg-nav px-4" expand="lg">
      {/* <Container> */}

        <Navbar.Brand href="/student/home" className="text-white">
        <img src="/navbrand3.png" className="logo-nav" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link className="text-white" href="/student/home">หน้าแรก</Nav.Link> */}
            {/* <Nav.Link className="text-white" href="/student/list-courses">คอร์สของฉัน</Nav.Link> */}
            {/* <Nav.Link href="/student/get-course/:id">/student/get-course/:id</Nav.Link> */}
          </Nav>
        </Navbar.Collapse>

        <Navbar.Collapse className="justify-content-end">

          <Navbar.Text>
            Signed in as:
          </Navbar.Text>
          <NavDropdown title={sessionStorage.getItem("firstname")} id="navbarScrollingDropdown">
            <NavDropdown.Item onClick={logout}>logout</NavDropdown.Item>
          </NavDropdown>

          {/* <Nav.Link onClick={logout}>logout</Nav.Link> */}
        </Navbar.Collapse>
      {/* </Container> */}
    </Navbar>
  );
};

export default NavStudent;
