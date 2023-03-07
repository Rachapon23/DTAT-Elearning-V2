import React from "react";
import { useEffect, useState } from "react";
import NavTeacher from "../../../layout/NavTeacher";
import "./course.css";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { getUserCourse } from "../../../../function/teacher/funcCourse";
import { Table } from "antd";

const CourseManageUser = () => {
  const [user, setUser] = useState();
  const columns = [
    {
      title: "No",
      align: "center",
      dataIndex: "_id",
      render: (_, dataObj) => {
        return user.indexOf(dataObj) + 1;
      },
    },
    {
      title: `employee`,
      align: "center",
      dataIndex: "employee_ID",
    },
    {
      title: `department`,
      align: "center",
      dataIndex: "department_ID",
    },
    {
      title: `plant`,
      align: "center",
      dataIndex: "plant",
    },
    {
      title: `first name`,
      align: "center",
      dataIndex: "firstname",
    },
    {
      title: `last name`,
      align: "center",
      dataIndex: "lastname",
    },
    {
      title: `Score`,
      align: "center",
      dataIndex: "xxxxx",
    },
    {
      title: `manage`,
      align: "center",
      render: () => {
        return "xx";
      },
    },
  ];

  const { id } = useParams();
  const [course, setCourse] = useState();

  //   const navigate = useNavigate();

  const fetchCourse = () => {
    getUserCourse(sessionStorage.getItem("token"), id)
      .then((response) => {
        console.log(response.data);
        setUser(response.data);
        // setUser(response.data.user);
      })
      .catch((err) => {
        console.log(err);
        Swal.fire("Alert!", "Cannot fetch course data", "error");
      });
  };
  useEffect(() => {
    fetchCourse();
  }, []);

  return (
    <div>
      <NavTeacher />
      <div className="container ">
        {user && (
          <>
            <div className="mt-3">
              <div className="card">
                <div className="card-body">
                  <Table
                    columns={columns}
                    dataSource={user}
                    pagination={{
                      defaultPageSize: 20,
                      showSizeChanger: true,
                      pageSizeOptions: ["10", "20", "30"],
                    }}
                  />
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
