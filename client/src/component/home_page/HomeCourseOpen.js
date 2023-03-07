import React from "react";
import "./homepage.css";
import { getCourseHome } from "../../function/admin/funcHome";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavHome from './NavHome';
const HomeCourseOpen = () => {
  const [courseSelectOpen, setCourseSelectOpen] = useState([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const loadCourse = () => {
    getCourseHome(sessionStorage.getItem("token"))
      .then((res) => {
        console.log(res.data);
        setCourseSelectOpen(res.data.open);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadCourse();
  }, []);


  const checkToken = (id) => {
    if (!!sessionStorage.getItem('token')) {
      navigate('/course-home/' + id)
    } else {
      setOpen(true)
    }
  }
  return (
    <div className="black-g-home">
      <NavHome setOpen={setOpen} open={open} />
      <div className='mt-5'>
        <div className="container">
          <div className="row">
            {courseSelectOpen.map((course, index) => (
              <div className="col-md-6 p-2 course-home" key={index} >
                <div
                  className="card back-public-2 shadow-sm"
                  onClick={() => checkToken(course._id)}
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
  );
};

export default HomeCourseOpen;
