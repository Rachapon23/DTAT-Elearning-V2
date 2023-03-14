import React from "react";
import { login } from "../../function/auth";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from 'antd';
import "./auth.css";
import { sendEmail } from "../../function/auth";
import { checkRole } from "../../function/funcroute";
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState({});
  const [isModalOpen, setIsMoalOpen] = useState(false);
  const [loading, setLoading] = useState(false)
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const [value, setValue] = useState({
    employee_ID: "",
    password: "",
  });

  const [error, setError] = useState({
    employee_ID: "",
    password: "",
    email: "",
  });

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: "" });
  };

  const handleEmail = (e) => {
    setEmail({ ...email, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: "" });
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

        roleBaseRedirect(res.data.Payload.user.role);
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

  //ไปที่ page ตาม role
  const roleBaseRedirect = (role) => {
    if (role === "admin") {
      navigate("/admin/home");
    } else if (role === "teacher") {
      navigate("/teacher/home");
    } else if (role === "student") {
      navigate("/student/home");
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    console.log(!!sessionStorage.getItem("token"));
    if (!!sessionStorage.getItem("token")) {
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
    }
    // if (sessionStorage.length != 0) {
    //   if (sessionStorage.getItem("role") === "admin") {
    //     navigate("/admin/home");
    //   } else if (sessionStorage.getItem("role") === "teacher") {
    //     navigate("/teacher/home");
    //   } else {
    //     navigate("/student/home");
    //   }
    // }
  }, []);

  const handleSendEmail = (e) => {
    e.preventDefault();
    console.log(email);
    setLoading(true)
    sendEmail(email)
      .then((res) => {
        console.log(res);
        setLoading(false)
        Swal.fire(
          "Success",
          "Send email success, Please check your email inbox",
          "success"
        );
        // navigate("/");
      })
      .catch((err) => {
        setLoading(false)
        const err_obj = err.response.data;
        console.log(err);
        try {
          console.log(err_obj.field);
          if (err_obj.field === "email") setError({ email: err_obj.data });
          else Swal.fire("error", err_obj, "error");
        } catch (err) {
          Swal.fire("error", "Unexpected error please contact admin", "error");
        }
      });
  };

  const showModal = () => {
    setIsMoalOpen(true);
  };

  const closeModal = () => {
    setIsMoalOpen(false);
  };

  return (
    <div className="">
      <nav className="navbar navbar-light  bg-nav">
        <div className="container">
          <a className="navbar-brand text-white brand" href="/">
            <img src="/navbrand3.png" className="logo-nav" />
            &nbsp;
          </a>
        </div>
      </nav>
      <div className="black-g">
        <div className="container">
          <div className="d-flex justify-content-center">
            <div className="card w-75  mt-5 shadow-sm">
              <div className="card-body p-5">
                <h3 className="text-center my-4"> Login </h3>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className="form-label"> Employee ID</label>
                    <input
                      className={
                        error.employee_ID && error.employee_ID.length !== 0
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      type="text"
                      name="employee_ID"
                      id="employee_ID"
                      onChange={handleChange}
                    />
                    <div className="invalid-feedback">{error.employee_ID}</div>
                  </div>

                  <div className="form-group mt-3">
                    <label className="form-label"> Password </label>
                    <input
                      className={
                        error.password && error.password.length !== 0
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      type="password"
                      name="password"
                      id="password"
                      onChange={handleChange}
                    />

                    <div className="invalid-feedback">{error.password}</div>
                  </div>

                  <br />
                  <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-outline-primary">
                      login
                    </button>
                  </div>
                </form>

                <div className="d-flex justify-content-between">
                  <a
                    className="text-muted"
                    style={{ cursor: "pointer" }}
                    onClick={showModal}
                  >
                    {" "}
                    forgot password{" "}
                  </a>

                  <Modal
                    title="Reset Password"
                    open={isModalOpen}
                    // onOk={handleSendEmail}
                    // onCancel={closeModal}
                  
                  >
                <div className="form-group mt-3">
                  <label className="form-label"> Email </label>
                  <label className="form-label"> Email Hello </label>
                  <input
                    className={
                      error.email && error.email.length !== 0
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                    type="text"
                    name="email"
                    onChange={handleEmail}
                  />
                  <div className="invalid-feedback">{error.email}</div>
                </div>
              </Modal>

              <a className="text-muted" href="register">
                register
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <div className="d-flex justify-content-center">
          <a href="/" className="btn btn-outline-secondary">
            Home page
          </a>
        </div>
      </div>
    </div>
      </div >
    </div >
  );
};

export default Login;
