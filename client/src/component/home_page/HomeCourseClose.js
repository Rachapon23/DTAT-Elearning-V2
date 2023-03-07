import React from "react";
import "./homepage.css";
import { getCourseHome } from "../../function/admin/funcHome";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomeCourseClose = () => {
    const [courseSelectClose, setCourseSelectClose] = useState([]);
    const navigate = useNavigate();
    const loadCourse = () => {
      getCourseHome(sessionStorage.getItem("token"))
        .then((res) => {
          console.log(res.data);
          setCourseSelectClose(res.data.close);
        })
        .catch((err) => {
          console.log(err);
        });
    };
  
    useEffect(() => {
      loadCourse();
    }, []);
  return (
    <div>
    <nav className="navbar navbar-light  bg-nav d-flex justify-content-between px-5">
      <a className="navbar-brand text-white brand" href="/">
        <img src="navbrand3.png" className="logo-nav" />
        &nbsp;
      </a>
      <a href="/login" className="btn btn btn-light text-primary">sign in</a>
    </nav>
    <div className="black-g-home py-5">
      <div className="container">
        <div className="row">
          {courseSelectClose.map((course, index) => (
            <div className="col-md-6 p-2 course-home" key={index}>
              <div
                className="card back-public-2 shadow-sm "
                onClick={() => {
                  navigate('/course-home/'+course._id)
                }}
              >
                {course.image ? (
                  <img
                    src={`${process.env.REACT_APP_IMG}/${course.image}`}
                    className="card-img-top w-100"
                  />
                ) : (
                  <img
                    src="/book-main-img-3.png"
                    className="card-img-top w-100"
                  />
                )}
                <div className="card-body ">
                  <div className="d-flex justify-content-between">
                    <p className="card-title mb-0">{course.name}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
  )
}

export default HomeCourseClose