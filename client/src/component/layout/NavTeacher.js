import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import  './Nav.css'
import { useNavigate } from "react-router-dom";

const NavTeacher = () => {

  const navigate = useNavigate();


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
            {/* <Nav.Link href="/teacher/create-course">สร้างบทเรียน</Nav.Link> */}
            {/* <Nav.Link href="/teacher/create-quiz">สร้างแบบทดสอบ</Nav.Link> */}
            {/* <Nav.Link href="/teacher/list-score">ดูคะแนน</Nav.Link> */}
            {/* <Nav.Link href="/teacher/calendar">ตารางสอน</Nav.Link> */}
            <Nav.Link href="/teacher/list-quiz" > Quiz </Nav.Link>
            <Nav.Link href="/teacher/calendar-teacher"> Time table </Nav.Link>
            {/* <Nav.Link href="/teacher/quiz">--QUIZ--</Nav.Link>
            <Nav.Link href="/teacher/course">--COURSE--</Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">

          <Navbar.Text
           className=""
          >
            Signed in as: 
          </Navbar.Text>
            <NavDropdown title={sessionStorage.getItem("firstname")} id="navbarScrollingDropdown">
              <NavDropdown.Item onClick={logout}>logout</NavDropdown.Item>
            </NavDropdown>
          {/* <Nav.Link onClick={logout}>logout</Nav.Link> */}

        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavTeacher