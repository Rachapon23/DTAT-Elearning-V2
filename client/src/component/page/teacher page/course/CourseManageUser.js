import React from "react";
import { useEffect, useState } from "react";
import NavTeacher from "../../../layout/NavTeacher";
import "./course.css";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { getUserCourse } from "../../../../function/teacher/funcCourse";
import { Table } from "antd";

const CourseManageUser = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();

  //   const navigate = useNavigate();

  const fetchCourse = () => {
    getUserCourse(sessionStorage.getItem("token"), id)
      .then((response) => {
        console.log(response.data);
        setData(response.data);


      })
      .catch((err) => {
        console.log(err);
        Swal.fire("Alert!", "Cannot fetch course data", "error");
      });
  };
  useEffect(() => {
    fetchCourse();
  }, []);

  const calulateProcess = (process) => {
    console.log(process)
    // for(i in process) {

    // }
  }

  return (
    <div>
      <NavTeacher />
      <div className="container ">
        {!!data && (
          <>
            <div className="mt-3">
              <div className="card">
                <div className="card-body">
                  <table className="table text-center">
                    <thead>
                      <tr>
                        <td scope="col"></td>
                        <td scope="col">employee</td>
                        <td scope="col">department</td>
                        <td scope="col">name</td>
                        <td scope="col">process</td>
                        <td scope="col">score</td>
                        <td scope="col">manage</td>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((item, index) =>
                        <tr key={index}>
                          <td scope="row">{index+1}</td>
                          <td>{item.user.employee_ID}</td>
                          <td>{item.user.department_ID}</td>
                          <td>{item.user.firstname} {item.user.lastname}</td>
                          <td>
                            {calulateProcess(item)}
                          </td>
                          {!!item.score
                          ? <td>{item.score}/{item.max_score}</td>
                          : <td>-</td>
                          }
<td>
  <select name="" id="" className="form-select"></select>
</td>
                        </tr>
                      )}

                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CourseManageUser;
