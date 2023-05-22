import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { register, resetPassword, sendEmail } from "../../function/auth";
import Swal from 'sweetalert2'

const Register = () => {
  const navigate = useNavigate();
  const {id} = useParams()
  const [value, setValue] = useState({
    email: "",
    new_password: "",
    confirm_new_password: "",
  });

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(value);
    if(value.new_password != value.confirm_new_password){
      Swal.fire(
        'Error',
        'Password not match',
        'error'
      )
    }
    else {
      resetPassword(id, value)
      .then((res) => {
        console.log(res);
        Swal.fire(
          'Success',
          'Reset Password Success',
          'success'
        )
        navigate("/");
      })
      .catch((err) => {
        Swal.fire(
          'erroe',
          err.response.data,
          'error'
        )
      });
    }

  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-center">
        <div className="container">
          <div className="card">
            <div className="card-body">
              <h3 className="text-center my-4"> Reset Password </h3>

              <form onSubmit={handleSubmit}>
                 <div >

                  <div className="form-group col-md">
                    <label className="form-label"> Email </label>
                    <input
                      className="form-control"
                      type="text"
                      name="email"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group col-md pt-2">
                    <label className="form-label"> New Password </label>
                    <input
                      className="form-control"
                      type="password"
                      name="new_password"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group col-md pt-2">
                    <label className="form-label"> Confirm New Password </label>
                    <input
                      className="form-control"
                      type="password"
                      name="confirm_new_password"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <br />

                <div className="d-flex justify-content-center">
                  <button type="submit" className="btn btn-outline-success">
                    reset
                  </button>
                </div>

              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
