import React from "react";
import NavStudent from "../../layout/NavStudent";
import Mycourse from "./ChildrenHome/Mycourse";
import Search from "./ChildrenHome/Search";
import PublicCourse from "./ChildrenHome/PublicCourse";
import Calendar from "./ChildrenHome/Calendar";

import { getMycourse } from "../../../function/student/funcCourse";
import { useState, useEffect } from "react";

const HomePageStudent = () => {
  const [data, setData] = useState();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    loadMycourse();
  }, []);

  const loadMycourse = () => {
    const user_id = sessionStorage.getItem("user_id");
    getMycourse(sessionStorage.getItem("token"), user_id)
      .then((res) => {
        // console.log(res.data)
        setData(res.data.coursee);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <NavStudent />
      <div className="container">

        <div className="row">
          <div className="">
            <div className="bg-white mt-3 border">
              <div className="">
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
                          />
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="">
            {/* <div className="bg-white p-4 border mt-3">
              <label className="form-label mb-2">Search courses</label>
              <div className="">
                <Search loadMycourse={loadMycourse} />
              </div>
            </div> */}
            {/* <div className="bg-white p-4 border mt-3">
              <label className="form-label mb-3">Add a new course for teacher</label>
              <div className="d-flex justify-content-center">

                <img src="https://cdn-icons-png.flaticon.com/512/2659/2659360.png"
                  alt="" style={{ width: "12rem" }} />
              </div>
            </div> */}
            <div className="bg-white border mt-3 mb-5 p-5">
              {/* <label className="form-label mb-3">Reset course for teacher</label> */}
              <div className="mt-3">
                <Calendar />
              </div>
            </div>
            {/* <div className="bg-white p-4 border mt-3">
              <label className="form-label mb-3">Contact Line@</label>
              <div className="d-flex justify-content-center">
             
              </div>
              <h4 className='mt-3 text-center'>
                LINE: @Dtat-elearning
              </h4>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePageStudent;
