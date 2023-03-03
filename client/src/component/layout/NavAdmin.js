import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import './Nav.css'
import { useNavigate } from "react-router-dom";

const NavAdmin = () => {

  const navigate = useNavigate();


  const logout = () => {
    sessionStorage.clear()
    localStorage.clear()
    navigate("/");
  };


  return (
    <Navbar className="bg-nav" expand="lg">
      <Container>
        <Navbar.Brand href="/admin/home" className="text-white">
          <img src="/navbrand3.png" className="logo-nav" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link href="/admin/home">หน้าแรก</Nav.Link> */}
            <Nav.Link href="/admin/managehome"> Manage Home </Nav.Link>
            <Nav.Link href="/admin/list-users"> All user </Nav.Link>
            {/* <Nav.Link href="/homeadmin">จัดการแอดมิน</Nav.Link> */}
            <Nav.Link href="/admin/list-teachers"> Manage teacher </Nav.Link>
            <Nav.Link href="/admin/list-students"> Manage student </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">

          <Navbar.Text className="">
            Signed in as:&nbsp;
          </Navbar.Text>

          <NavDropdown title={sessionStorage.getItem("firstname")} id="navbarScrollingDropdown">
              <NavDropdown.Item onClick={logout}>logout</NavDropdown.Item>
            </NavDropdown>


        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavAdmin;
