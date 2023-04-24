import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import './Nav.css'
import { useNavigate } from "react-router-dom";
import { Button, Dropdown } from 'antd';

const NavTeacher = () => {

  const navigate = useNavigate();


  const items = [
    {
      key: '1',
      label: "Log Out",
    },
  ];
  const handleMenuClick = (e) => {
    sessionStorage.clear()
    localStorage.clear()
    navigate("/");
  };
  const logout = () => {

    sessionStorage.clear()
    localStorage.clear()
    navigate("/");
  };
  // console.log(user.firstname)
  return (
    <Navbar className="bg-nav" expand="lg">
      <Container>
        <Navbar.Brand href="/teacher/home" className="text-white">
          <img src="/navbrand3.png" className="logo-nav" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link href="/teacher/home">หน้าแรก</Nav.Link> */}
            <Nav.Link href="/teacher/list-courses"> Course </Nav.Link>
            <Nav.Link href="/teacher/list-quiz" > Quiz </Nav.Link>
            <Nav.Link href="/teacher/calendar-teacher"> Time table </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">

          <Navbar.Text>
            Signed in as:
          </Navbar.Text>
          <Dropdown className="ms-2"
            menu={{
              items,
              onClick: handleMenuClick,
            }}
            placement="bottomRight"
          >
            <Button>{sessionStorage.getItem('firstname')}</Button>
          </Dropdown>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavTeacher