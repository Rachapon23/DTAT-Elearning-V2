import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { register } from "../../function/auth";
import Swal from 'sweetalert2'
import './auth.css'
const Register = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState({
    employee_ID: "",
    department_ID: "",
    password: "",
    repassword: "",
    firstname: "",
    lastname: "",
  });
  const [error, setError] = useState({
    employee_ID: "",
    department_ID: "",
    password: "",
    repassword: "",
    email: "",
    firstname: "",
    lastname: "",
  });

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(value); 
    if(value.password !== value.repassword ){

      Swal.fire(
        'Error',
        'Password not match',
        'error'
      )
    } else {
      register(value)
      .then((res) => {
        console.log(res);
        Swal.fire(
          'Success',
          'Register success',
          'success'
        )
        navigate("/");
      })
      .catch((err) => {
        const err_obj = err.response.data
        console.log(err)
        try {
          
          if(err_obj.field === "employee_ID") setError({employee_ID: err_obj.data});
          else if(err_obj.field === "department_ID") setError({department_ID: err_obj.data});
          else if(err_obj.field === "password") setError({password: err_obj.data});
          else if(err_obj.field === "repassword") setError({repassword: err_obj.data});
          else if(err_obj.field === "email") setError({email: err_obj.data});
          else if(err_obj.field === "firstname") setError({firstname: err_obj.data});
          else if(err_obj.field === "lastname") setError({lastname: err_obj.data});
          else Swal.fire(
            'error',
            err_obj,
            'error'
          )
        }
        catch(err) {
          Swal.fire(
            'error',
            "Unexpected error please contact admin",
            'error'
          )
        }
      });
    }
  };
  return (
    <div>
      <nav className="navbar navbar-light  bg-nav">
      <div className="container">
          <a className="navbar-brand text-white brand" href="/">
            <img src="navbrand3.png" className="logo-nav" />&nbsp;
          </a>
        </div>
      </nav>

        <div className="black-g">
          <div className="container mt-5">
            <div className="d-flex justify-content-center">
            <div className="container">
              <div className="card shadow-sm">
                <div className="card-body p-5">
                  <h3 className="text-center my-4"> Register </h3>
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="form-group col-md-6 mt-3">
                        <label className="form-label"> Employee ID</label>
                        <input
                          className={
                            error.employee_ID && error.employee_ID.length !== 0 ? "form-control is-invalid" : "form-control"
                          }
                          type="text"
                          name="employee_ID"
                          onChange={handleChange}
                        />
                        <div class="invalid-feedback">
                          {error.employee_ID}
                        </div>
                      </div>
                      <div className="form-group col-md-6  mt-3">
                        <label className="form-label"> Department ID </label>
                        <input
                          className={
                            error.department_ID && error.department_ID.length !== 0 ? "form-control is-invalid" : "form-control"
                          }
                          type="text"
                          name="department_ID"
                          onChange={handleChange}
                        />
                        <div class="invalid-feedback">
                          {error.department_ID}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-md-6  mt-3">
                        <label className="form-label"> Password </label>
                        <input
                          className={
                            error.password && error.password.length !== 0 ? "form-control is-invalid" : "form-control"
                          }
                          type="password"
                          name="password"
                          onChange={handleChange}
                        />
                        <div class="invalid-feedback">
                          {error.password}
                        </div>
                      </div>
                      <div className="form-group col-md-6  mt-3">
                        <label className="form-label"> Confirm Password</label>
                        <input
                          className={
                            error.repassword && error.repassword.length !== 0 ? "form-control is-invalid" : "form-control"
                          }
                          type="password"
                          name="repassword"
                          onChange={handleChange}
                        />
                        <div class="invalid-feedback">
                          {error.repassword}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                        <div className="form-group mt-3">
                          <label className="form-label">Email</label>
                          <input
                            className={
                              error.email && error.email.length !== 0 ? "form-control is-invalid" : "form-control"
                            }
                            type="text"
                            name="email"
                            onChange={handleChange}
                          />
                          <div class="invalid-feedback">
                            {error.email}
                          </div>
                        </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-md-6  mt-3">
                        <label className="form-label"> First Name </label>
                        <input
                          className={
                            error.firstname && error.firstname.length !== 0 ? "form-control is-invalid" : "form-control"
                          }
                          type="text"
                          name="firstname"
                          onChange={handleChange}
                        />
                        <div class="invalid-feedback">
                          {error.firstname}
                        </div>
                      </div>
                      <div className="form-group col-md-6  mt-3">
                        <label className="form-label"> Last Name </label>
                        <input
                          className={
                            error.lastname && error.lastname.length !== 0 ? "form-control is-invalid" : "form-control"
                          }
                          type="text"
                          name="lastname"
                          onChange={handleChange}
                        />
                        <div class="invalid-feedback">
                          {error.lastname}
                        </div>
                      </div>
                      
                    </div>
                    <br />
                    <div className="d-flex justify-content-center">
                      <button type="submit" className="btn btn-outline-success">
                        register
                      </button>
                    </div>
                    </form>
              </div>
            </div>
            </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Register;
