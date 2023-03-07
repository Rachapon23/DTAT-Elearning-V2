import React from "react";
import PublicCourse from "./PublicCourse";
import PrivateCourse from "./PrivateCourse";
import { useEffect, useState } from "react";
import { getCourse } from "../../../function/student/funcCourse";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

const CourseHome = () => {
  const [course, setCourse] = useState({});
  const { id } = useParams();
  const [topic, setTopic] = useState();
  const [member, setMember] = useState([]);

  const fetchCourse = () => {
    getCourse(sessionStorage.getItem("token"), id)
      .then((response) => {
        console.log(response);
        setCourse(response.data);
        setTopic(response.data.topic);
        setMember(response.data.member);
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
      <nav className="navbar navbar-light  bg-nav d-flex justify-content-between px-5">
        <a className="navbar-brand text-white brand" href="/">
          <img src="/navbrand3.png" className="logo-nav" />
          &nbsp;
        </a>
        {/* <a href="/login" className="btn btn btn-light text-primary">sign in</a> */}
      </nav>
      <div className="black-g-home py-5">
        <div className="container">
          <div className="row">
            {course.statuscourse ? (
              <PrivateCourse course={course} member={member} />
            ) : (
              <PublicCourse course={course} topic={topic} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseHome;
