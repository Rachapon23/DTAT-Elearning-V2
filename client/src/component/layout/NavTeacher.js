import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import './Nav.css'
import { useNavigate } from "react-router-dom";
import { Button, Dropdown } from 'antd';
import { routeAdmin } from "../../function/funcroute";
import { routeTeacher } from "../../function/funcroute";
import { routeUser } from "../../function/funcroute";

const NavTeacher = () => {

  const navigate = useNavigate();

  const CheckAdmin = async () => {
    let isAdmin = false
    await routeAdmin(sessionStorage.getItem("token"))
      .then((res) => {
        if (res.data.status) {
          isAdmin = res.data.status
          navigate(`/admin/home`)
        }
        else {
          isAdmin = false
        }
      })
      .catch(() => {
        isAdmin = false
      })
    return isAdmin
  }

  const CheckTeacher = async () => {
    let isTeacher = false
    await routeTeacher(sessionStorage.getItem("token"))
      .then((res) => {
        if (res.data.status) {
          isTeacher = true
          navigate(`/teacher/home`)
        }
        else {
          isTeacher = false
        }
      })
      .catch(() => {
        isTeacher = false
      })
    return isTeacher
  }

  const CheckUser = async () => {
    let isUser = false
    await routeUser(sessionStorage.getItem("token"))
      .then((res) => {
        if (res.data.status) {
          isUser = res.data.status
          navigate(`/student/home`)
        }
        else {
          isUser = false
        }
      })
      .catch(() => {
        isUser = false
      })
    return isUser
  }

  const handleClickLogo = async (e) => {
    if (await CheckAdmin()) return
    if (await CheckTeacher()) return
    if (await CheckUser()) return
  }

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
        <Navbar.Brand className="text-white" onClick={handleClickLogo} style={{ cursor: "pointer" }}>
          <img src="/navbrand3.png" className="logo-nav" alt="logo" />
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