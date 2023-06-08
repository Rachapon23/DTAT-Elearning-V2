import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import './Nav.css'
import { Button, Dropdown } from 'antd';
import { useNavigate } from "react-router-dom";
import { routeAdmin } from "../../function/funcroute";
import { routeTeacher } from "../../function/funcroute";
import { routeUser } from "../../function/funcroute";

const NavStudent = () => {

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
  // console.log(user)
  return (
    <Navbar className="bg-nav px-4" expand="lg">
      <Navbar.Brand className="text-white" onClick={handleClickLogo} style={{ cursor: "pointer" }}>
        <img src="/navbrand3.png" className="logo-nav" alt="logo" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
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
    </Navbar>
  );
};

export default NavStudent;
