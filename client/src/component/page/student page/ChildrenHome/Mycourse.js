import React from 'react'
import { useEffect, useState } from "react";
import Swal from 'sweetalert2'
import { Navigate, useNavigate } from 'react-router-dom'
import '../student.css'
import { Progress } from "antd"
import {
  getCourse,
  getProcess,
} from "../../../../function/student/funcCourse";



const Mycourse = ({ item, loadMycourse, courseID }) => {

  const navigate = useNavigate()
  const [studentProcess, setStudentProcess] = useState();
  const [totalProcess, setTotalProcess] = useState(0)
  const [course, setCourse] = useState("");
  const [id, setID] = useState(courseID);

  const nextToCourse = (params) => {
    // console.log(params)
    if (item.enabled) {
      navigate('/student/get-course/' + params)
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'This course is now not available, plase try again later',
      })
    }
  }

  const fetchProcess = ()  => {
    
    getProcess(sessionStorage.getItem("token"), {course: id})
      .then((response) => {
        console.log("process -> ",response.data);
        setStudentProcess(response.data);
        
      })
      .catch((err) => {
        console.log(err);
        Swal.fire("Alert!", "Cannot fetch course data", "error");
      });
};

const fetchCourse = () => {
  getCourse(sessionStorage.getItem("token"), id)
      .then(async (response) => {
          console.log(response)
          setCourse(response.data)
          fetchProcess();
      })
      .catch((err) => {
          console.log(err)
          Swal.fire(
              "Alert!",
              "Cannot fetch course data",
              "error"
          )
      })
}


useEffect(() => {
  fetchCourse();
}, []);

  useEffect(() => {
    if(studentProcess) {
        let complete = 0;
        console.log("process after course: ",studentProcess)
        for(let i = 0; i < studentProcess.process.length; i++) {
            console.log("in loop: ",studentProcess.process[i])
            if(studentProcess.process[i] === 1) {
                complete++;
            }
            
        }
        
        console.log("rec: ",studentProcess.process)
        for(let i = 0 ; i < 3; i++) {
            console.log(studentProcess.process[i])
        }
        setTotalProcess(parseInt((complete * 100) /  course.video_amount));
    }
  }, [studentProcess])

  return (

    <div className="col-md-3" >
      <div className="card mt-3 card-h back-public-2 shadow-sm back-public-black-2" onClick={() => nextToCourse(item._id)}>
        {!!item.image
          ? <img src={`${process.env.REACT_APP_IMG}/${item.image}`} className="card-img-top resize " />
          : <img src="/book-main-img-3.png" className="card-img-top w-100" />
        }
        <div className="card-body ">
          <h5 className="card-title">{item.name}</h5>
          {/* <p style={{ fontSize: '14px' }} className="card-text text-muted mb-0">Course ID : {item.course_number}</p> */}
          {item.description.length < 45
            ? <p style={{ fontSize: '14px' }} className="card-text text-muted">Detail : {(item.description)}</p>
            : <p style={{ fontSize: '14px' }} className="card-text text-muted">Detail : {(item.description.substring(0, 45))}...</p>
          }
          <Progress
              percent={totalProcess}
              strokeColor={{
                  "0%": "#108ee9",
                  "100%": "#87d068",
              }}
          />
        </div>
      </div>
    </div>

  )
}

export default Mycourse