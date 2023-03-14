import React from "react";
import NavStudent from "../../layout/NavStudent";
import Mycourse from "./ChildrenHome/Mycourse";
import Search from "./ChildrenHome/Search";
import PublicCourse from "./ChildrenHome/PublicCourse";
import Calendar from "./ChildrenHome/Calendar";
import { Table } from "antd";
import { getMycourse,getMyHistoryStudent, getProcess} from "../../../function/student/funcCourse";
import { useState, useEffect } from "react";

const HomePageStudent = () => {
  const [data, setData] = useState();
  const [history, setHistory] = useState();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    loadMycourse();
    loadMyHistory();
  }, []);

  const loadMycourse = () => {
    // const user_id = sessionStorage.getItem("user_id");

    getMycourse(sessionStorage.getItem("token"))
      .then((res) => {
        // console.log(res.data)
        setData(res.data.coursee);
        // setHistory(res.data.history);
      })
      .catch((err) => {
        console.log(err);
      });

  };
  const loadMyHistory = () => {
    getMyHistoryStudent(sessionStorage.getItem("token"))
      .then((res) => {
        console.log(res.data)
        setHistory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  };
  const columns = [
    {
      title: "No",
      align: "center",
      dataIndex: "_id",
      render: (_, dataObj) => {
        return history.indexOf(dataObj) + 1;
      },
    },
    {
      title: `course`,
      align: "center",
      dataIndex: "course",
    },

    {
      title: `score`,
      align: "center",
      dataIndex: "score",
    },

    {
      title: `max score`,
      align: "center",
      dataIndex: "maxscore",
    },

    {
      title: `result`,
      align: "center",
      dataIndex: "result",
    },

   
  ];
  return (
    <div>
      <NavStudent />
      <div className="container">

        <div className="row">
          <div className="">
            <div className="bg-white mt-3 border">
              <div className="my-4">
                <PublicCourse />
              </div>
            </div>
          </div>
          <div className="">
            <div className="bg-white p-4 borderl mt-3">
              <label className="form-labe mb-2">My Course</label>
              <div className="">
                <div className="row">
                  <div className="col-md-12">
                    <div className="row">
                      {data &&
                        data.map((item, index) => (
                          <Mycourse
                            item={item}
                            key={index}
                            loadMycourse={loadMycourse}
                            courseID={item._id}
                          />
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <div className="bg-white p-4 borderl mt-3">
              <label className="form-labe mb-2">My History</label>
              <div className="">
              <Table
                columns={columns}
                dataSource={history}
               
                pagination={{
                  defaultPageSize: 20,
                  showSizeChanger: true,
                  pageSizeOptions: ["10", "20", "30"],
                }}
              />
              </div>
            </div>
          </div>
          <div className="">
      
            <div className="bg-white border mt-3 mb-5 p-5">
              {/* <label className="form-label mb-3">Reset course for teacher</label> */}
              <div className="mt-3">
                <Calendar />
              </div>
            </div>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePageStudent;
