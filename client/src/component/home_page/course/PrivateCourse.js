import React from "react";
import { useEffect, useState } from "react";
import { Progress, Space } from "antd";
import Calendar from "./CalendarForcourse";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import { Addchcourse } from '../../../function/student/funcCourse'
const PrivateCourse = ({ course, member }) => {

  const { id } = useParams();
  const navigate = useNavigate();
  // console.log(course)
// const [percent,setPercent] = useState(0)

  const registerCourse = () => {
    // console.log(id)
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    Swal.fire({
      title: 'Are you about to add course?',
      showCancelButton: true,
      confirmButtonText: 'yes',
      confirmButtonColor: '#28a745',
      showLoaderOnConfirm: true,
      preConfirm: (password) => {
        return (

          Addchcourse(sessionStorage.getItem("token"), { id })
            .then(res => {
              console.log(res)
              Toast.fire({
                icon: 'success',
                title: 'Signed in successfully'
              })
              // navigate('/student/home')
            }).catch(err => {
              if (err.response.data == 'course already exist') {
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'You already enrolled this course',
                  confirmButtonColor: '#0d6efd',
                  confirmButtonText: 'try again'
                })
              }else if(err.response.data == 'amount A is max'){
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: err.response.data,
                  confirmButtonColor: '#0d6efd',
                  confirmButtonText: 'try again'
                })
              
              }else if(err.response.data == 'plant not math'){
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: err.response.data,
                  confirmButtonColor: '#0d6efd',
                  confirmButtonText: 'try again'
                })
              } else {
                console.log(err)
              }
            }
            ))
      },

    })

  };
  return (
    <div className="container mb-5">
      {course && (
        <>
          {course.image ? (
            <div className="card mt-3">
              <img
                src={`${process.env.REACT_APP_IMG}/${course.image}`}
                width="100%"
                className="img-size-student card-img-top"
              />
              <div className="card-body">
                <div className="mt-3 px-2">
                  <h3 className="card-title mb-3 fw-bold">{course.name}</h3>
                  <p className="card-text fs-6">
                    Detail : {course.description}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="card mt-3">
              <div className="card-body alert-primary">
                <div className="mt-3 px-2 text-dark">
                  <h3 className="card-title mb-3 fw-bold">{course.name}</h3>
                  <p className="card-text fs-6">
                    Detail : {course.description}
                  </p>
                </div>
              </div>
            </div>
          )}
          <div className="row">
            <div className="col-md-6">
              <div className="card mt-3">
                <div className="card-body">
                  {member &&
                    member.map((item, index) => (
                      <div className="mt-2" key={index}>
                        <p>
                          รับแผนก : {item.plant} จำนวน : {item.amount} คน
                        </p>
                        <p>ลงชื่อแล้ว : {item.registerd} คน</p>
                        <Progress
                        
                          percent={((item.registerd)/(parseInt(item.amount)))*100}
                          strokeColor={{
                            "0%": "#108ee9",
                            "100%": "#87d068",
                          }}
                        />
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <Calendar id={id} />
            </div>
          </div>

          <div className="mt-3">
            <div className="d-grid">
              <button onClick={registerCourse} className="btn btn-success">
                ลงชื่อเข้าอบรม
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PrivateCourse;
