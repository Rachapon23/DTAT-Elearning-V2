import React from "react";
import NavAdmin from "../../../layout/NavAdmin";
import "../admin.css";
import { useNavigate } from "react-router-dom";
import { Table } from "antd";
import Plant from "./Plant";
import Room from "./Room";

const HomePageAdmin = () => {
  const navigate = useNavigate();
  const teacher = () => {
    navigate("/teacher/home");
  };
  const student = () => {
    navigate("/student/home");
  };

  return (
    <div>
      <NavAdmin />
      <div className="container mt-3">
        <div className="">
          <div className="card">
            <label className="form-label mt-3 ms-4">Navigation</label>
            <div className="card-body">
              <div className="row px-5 pb-5 pt-2">
                <div className="col-md-6">
                  {/* <div className="d-flex justify-content-center"></div> */}
                  <div
                    className="card card-img-teacher shadow-sm"
                    onClick={teacher}
                  >
                    <div className="card-img-overlay">
                      <p className="card-title">Go to Teacer page</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div
                    className="card card-img-student shadow-sm"
                    onClick={student}
                  >
                    <div className="card-img-overlay">
                      <p className="card-title">Go to Student page</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Plant />
        <Room />
      </div>
    </div>
  );
};

export default HomePageAdmin;
