import React from "react";
import { useEffect, useState } from "react";
import NavTeacher from "../../../layout/NavTeacher";
import "./course.css";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { getUserCourse,CourseSuccess } from "../../../../function/teacher/funcCourse";
import { Table } from "antd";

const CourseManageUser = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();

  //   const navigate = useNavigate();

  const fetchCourse = () => {
    getUserCourse(sessionStorage.getItem("token"), id)
      .then((response) => {
        // console.log(response.data);
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

  const calulateProcess = (data) => {
    console.log("->>> ", data.user.employee_ID, data.process, data.coursee.video_amount)
    const total_process = (data.process.length * 100) /  data.coursee.video_amount;
    return total_process

  }
  const successCourse = (e, user,activity) => {
    console.log(e.target.value, user)
    CourseSuccess(sessionStorage.getItem("token"), 
    {
      result:e.target.value,
      user:user,
      activity:activity,
      course:id
    }
    )
      .then((response) => {
        console.log(response.data);
        fetchCourse()
      })
      .catch((err) => {
        console.log(err);

      });
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
                        <td scope="col">plant</td>
                        <td scope="col">name</td>
                        <td scope="col">process</td>
                        <td scope="col">score</td>
                        <td scope="col">manage</td>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((item, index) =>
                        <tr key={index}>
                          <td scope="row">{index + 1}</td>
                          <td>{item.user.employee_ID}</td>
                          <td>{item.user.department_ID}</td>
                          <td>{item.user.plant}</td>
                          <td>{item.user.firstname} {item.user.lastname}</td>
                          {!!calulateProcess(item)
                          ? <td>{calulateProcess(item)} %</td>
                          : <td>-</td>
                          }
                          {/* <td>
                            {calulateProcess(item)}
                          </td> */}
                          {!!item.score
                          ? <td>{item.score}/{item.max_score}</td>
                          : <td>-</td>
                          }
                          <td>
                            <select name="result" defaultValue={null} id="" className="form-select"  onChange={(e) => successCourse(e, item.user._id,item._id)}>
                              <option value={null}></option>
                              <option value="pass">pass</option>
                              <option value="notpass">not pass</option>
                            </select>
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
