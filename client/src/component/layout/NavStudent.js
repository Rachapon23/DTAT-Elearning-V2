import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import './Nav.css'
import { Button,Dropdown} from 'antd';
import { useNavigate } from "react-router-dom";
const NavStudent = () => {

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
  // console.log(user)
  return (
    <Navbar className="bg-nav px-4" expand="lg">
        <Navbar.Brand href="/" className="text-white">
        <img src="/navbrand3.png" className="logo-nav" />
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
