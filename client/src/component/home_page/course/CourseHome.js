import React from "react";
import PublicCourse from "./PublicCourse";
import PrivateCourse from "./PrivateCourse";
import { useEffect, useState } from "react";
import { getCourse } from "../../../function/student/funcCourse";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import NavHome from "../NavHome";

const CourseHome = () => {
  const [course, setCourse] = useState({});
  const { id } = useParams();
  const [topic, setTopic] = useState();
  const [member, setMember] = useState([]);
  const [open, setOpen] = useState(false);

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
    <div className="black-g-home">
    <NavHome setOpen={setOpen} open={open} />
    <div className=''>
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
