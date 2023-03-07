import React from 'react'
import { Button, Modal, Dropdown, Space } from 'antd';
import { useState } from 'react';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { sendEmail } from "../../function/auth";
import { login } from "../../function/auth";
import { checkRole } from "../../function/funcroute";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const NavHome = ({ open, setOpen }) => {
    // const [open, setOpen] = useState(false);


    const navigate = useNavigate();
    const [email, setEmail] = useState({});
    const [isModalOpen, setIsMoalOpen] = useState(false);

    const [value, setValue] = useState({
        employee_ID: "",
        password: "",
    });

    const [error, setError] = useState({
        employee_ID: "",
        password: "",
        email: "",
    });


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


    const showModal = () => {
        setIsMoalOpen(true);
    };

    const closeModal = () => {
        setIsMoalOpen(false);
    };

    const handleSendEmail = (e) => {
        e.preventDefault();
        console.log(email);
        sendEmail(email)
            .then((res) => {
                console.log(res);
                Swal.fire(
                    "Success",
                    "Send email success, Please check your email inbox",
                    "success"
                );
                // navigate("/");
            })
            .catch((err) => {
                const err_obj = err.response.data;
                console.log(err);

            });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!!!value.employee_ID) {
            setError({ employee_ID: "Please enter employee ID" });
            document.getElementById("employee_ID").focus({ focusVisible: true });
            return;
        } else if (!!!value.password) {
            setError({ password: "Please enter password" });
            document.getElementById("password").focus({ focusVisible: true });
            return;
        }

        login(value)
            .then((res) => {
                console.log(res.data);
                sessionStorage.setItem("token", res.data.token);
                sessionStorage.setItem("firstname", res.data.Payload.user.fisrtname);
                sessionStorage.setItem("user_id", res.data.Payload.user.user_id);
                // sessionStorage.setItem("role", res.data.Payload.user.role)

                // roleBaseRedirect(res.data.Payload.user.role);
                setOpen(false)
            })
            .catch((err) => {
                const err_obj = err.response.data;

                try {
                    console.log(err_obj.field);
                    if (err_obj.field === "employee_ID")
                        setError({ employee_ID: err_obj.data });
                    else if (err_obj.field === "password")
                        setError({ password: err_obj.data });
                    else Swal.fire("error", err_obj, "error");
                } catch (err) {
                    Swal.fire("error", "Unexpected error please contact admin", "error");
                }
            });
    };
    const roleBaseRedirect = (role) => {
        checkRole(sessionStorage.getItem("token"))
            .then((res) => {
                console.log(res);
                if (res.data === "admin") {
                    navigate("/admin/home");
                } else if (res.data === "teacher") {
                    navigate("/teacher/home");
                } else if (res.data === "student") {
                    navigate("/student/home");
                } else {
                    navigate("/login");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleChange = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value });
        setError({ ...error, [e.target.name]: "" });
    };

    const handleEmail = (e) => {
        setEmail({ ...email, [e.target.name]: e.target.value });
        setError({ ...error, [e.target.name]: "" });
    };
    return (

        <Navbar className="bg-nav px-4 mb-5" expand="lg">
            <Navbar.Brand href="/student/home" className="text-white">
                <img src="/navbrand3.png" className="logo-nav" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse className="justify-content-end">
                {!!sessionStorage.getItem('token')
                    ?
                    <>
                       
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
                        <Button type="primary" onClick={roleBaseRedirect} className="ms-2">
                            go to my Home
                        </Button>
                    </>
                    : <>
                  <Button type="primary" onClick={() => setOpen(true)}>
                             Sing In
                         </Button>
                         <Modal
                            title="Sing In"
                            centered
                            open={open}
                            onOk={() => setOpen(false)}
                            onCancel={() => setOpen(false)}
                            footer={
                                <div>
                                    <div className="d-flex justify-content-center">
                                        <button className='btn btn-outline-primary' onClick={handleSubmit}>Sign In</button>
                                    </div>
                                    <div className='d-flex justify-content-between'>
                                        <div className="">
                                            <a className='btn text-muted' onClick={showModal}>forgot password</a>
                                        </div>

                                        <div className="">
                                            <a className='btn text-muted' href="register">register</a>
                                        </div>
                                    </div>

                                </div>
                            }
                        // width={1000}
                        >
                            <div className="d-flex justify-content-center">

                                <div className="mx-4 mt-3">
                                    {/* <h3 className="text-center my-4"> Login </h3> */}
                                    {/* <form onSubmit={handleSubmit}> */}
                                    <div className="form-group">
                                        <label className="form-label"> Employee ID</label>
                                        <input
                                            //   className={
                                            //     error.employee_ID && error.employee_ID.length !== 0
                                            //       ? "form-control is-invalid"
                                            //       : "form-control"
                                            //   }
                                            className='form-control'
                                            type="text"
                                            name="employee_ID"
                                            id="employee_ID"
                                            onChange={handleChange}

                                        />
                                        {/* <div className="invalid-feedback">{error.employee_ID}</div> */}
                                    </div>

                                    <div className="form-group mt-3">
                                        <label className="form-label"> Password </label>
                                        <input
                                            //   className={
                                            //     error.password && error.password.length !== 0
                                            //       ? "form-control is-invalid"
                                            //       : "form-control"
                                            //   }
                                            className='form-control'
                                            type="password"
                                            name="password"
                                            id="password"
                                            onChange={handleChange}
                                        />

                                        {/* <div className="invalid-feedback">{error.password}</div> */}
                                    </div>

                                    <br />
                                    {/* <div className="d-flex justify-content-center">
                                        <button type="submit" className="btn btn-outline-primary">
                                            login
                                        </button>
                                    </div> */}
                                    {/* </form> */}

                                    <div className="d-flex justify-content-between">
                                        {/* <a
                                    className="text-muted"
                                    style={{ cursor: "pointer" }}
                                    onClick={showModal}
                                >
                                    {" "}
                                    forgot password{" "}
                                </a> */}

                                        <Modal
                                            title="Reset Password"
                                            open={isModalOpen}
                                            onOk={handleSendEmail}
                                            onCancel={closeModal}
                                        >
                                            <div className="form-group mt-3">
                                                <label className="form-label"> Email </label>
                                                <input
                                                    // className={
                                                    //   error.email && error.email.length !== 0
                                                    //     ? "form-control is-invalid"
                                                    //     : "form-control"
                                                    // }
                                                    className='form-control'
                                                    type="text"
                                                    name="email"
                                                    onChange={handleEmail}
                                                />
                                                {/* <div className="invalid-feedback">{error.email}</div> */}
                                            </div>
                                        </Modal>

                                        {/* <a className="text-muted" href="register">
                                    register
                                </a> */}
                                    </div>
                                </div>

                            </div>
                        </Modal>
                    </>
                }



            </Navbar.Collapse>
        </Navbar>
        // <nav className="navbar navbar-light  bg-nav d-flex justify-content-between px-5 mb-5">
        //     <a className="navbar-brand text-white brand" href="/">
        //         <img src="/navbrand3.png" className="logo-nav" />&nbsp;
        //     </a>

        //     <>
        //         {!!sessionStorage.getItem('token')
        //             ?
        //             <div>
        //                 <Button type="primary" onClick={roleBaseRedirect} className="me-2">
        //                     go to my Home
        //                 </Button>
        //                 <Dropdown
        //                     menu={{
        //                         items,
        //                         onClick: handleMenuClick,
        //                     }}
        //                     placement="bottomRight"
        //                 >
        //                     <Button>{sessionStorage.getItem('firstname')}</Button>
        //                 </Dropdown>
        //             </div>

        //             : <>
        //                 <Button type="primary" onClick={() => setOpen(true)}>
        //                     Sing In
        //                 </Button>
        //                 <Modal
        //                     title="Sing In"
        //                     centered
        //                     open={open}
        //                     onOk={() => setOpen(false)}
        //                     onCancel={() => setOpen(false)}
        //                     footer={
        //                         <div>
        //                             <div className="d-flex justify-content-center">
        //                                 <button className='btn btn-outline-primary' onClick={handleSubmit}>Sign In</button>
        //                             </div>
        //                             <div className='d-flex justify-content-between'>
        //                                 <div className="">
        //                                     <a className='btn text-muted' onClick={showModal}>forgot password</a>
        //                                 </div>

        //                                 <div className="">
        //                                     <a className='btn text-muted' href="register">register</a>
        //                                 </div>
        //                             </div>

        //                         </div>
        //                     }
        //                 // width={1000}
        //                 >
        //                     <div className="d-flex justify-content-center">

        //                         <div className="mx-4 mt-3">
        //                             {/* <h3 className="text-center my-4"> Login </h3> */}
        //                             {/* <form onSubmit={handleSubmit}> */}
        //                             <div className="form-group">
        //                                 <label className="form-label"> Employee ID</label>
        //                                 <input
        //                                     //   className={
        //                                     //     error.employee_ID && error.employee_ID.length !== 0
        //                                     //       ? "form-control is-invalid"
        //                                     //       : "form-control"
        //                                     //   }
        //                                     className='form-control'
        //                                     type="text"
        //                                     name="employee_ID"
        //                                     id="employee_ID"
        //                                     onChange={handleChange}

        //                                 />
        //                                 {/* <div className="invalid-feedback">{error.employee_ID}</div> */}
        //                             </div>

        //                             <div className="form-group mt-3">
        //                                 <label className="form-label"> Password </label>
        //                                 <input
        //                                     //   className={
        //                                     //     error.password && error.password.length !== 0
        //                                     //       ? "form-control is-invalid"
        //                                     //       : "form-control"
        //                                     //   }
        //                                     className='form-control'
        //                                     type="password"
        //                                     name="password"
        //                                     id="password"
        //                                     onChange={handleChange}
        //                                 />

        //                                 {/* <div className="invalid-feedback">{error.password}</div> */}
        //                             </div>

        //                             <br />
        //                             {/* <div className="d-flex justify-content-center">
        //                                 <button type="submit" className="btn btn-outline-primary">
        //                                     login
        //                                 </button>
        //                             </div> */}
        //                             {/* </form> */}

        //                             <div className="d-flex justify-content-between">
        //                                 {/* <a
        //                             className="text-muted"
        //                             style={{ cursor: "pointer" }}
        //                             onClick={showModal}
        //                         >
        //                             {" "}
        //                             forgot password{" "}
        //                         </a> */}

        //                                 <Modal
        //                                     title="Reset Password"
        //                                     open={isModalOpen}
        //                                     onOk={handleSendEmail}
        //                                     onCancel={closeModal}
        //                                 >
        //                                     <div className="form-group mt-3">
        //                                         <label className="form-label"> Email </label>
        //                                         <input
        //                                             // className={
        //                                             //   error.email && error.email.length !== 0
        //                                             //     ? "form-control is-invalid"
        //                                             //     : "form-control"
        //                                             // }
        //                                             className='form-control'
        //                                             type="text"
        //                                             name="email"
        //                                             onChange={handleEmail}
        //                                         />
        //                                         {/* <div className="invalid-feedback">{error.email}</div> */}
        //                                     </div>
        //                                 </Modal>

        //                                 {/* <a className="text-muted" href="register">
        //                             register
        //                         </a> */}
        //                             </div>
        //                         </div>

        //                     </div>
        //                 </Modal>
        //             </>
        //         }

        //     </>
        // </nav>
    )
}

export default NavHome