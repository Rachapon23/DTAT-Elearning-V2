import React from 'react';
import { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import NavTeacher from "../../../layout/NavTeacher";
import './course.css';
import Swal from "sweetalert2";
import { Switch } from 'antd';
// import { Link } from "react-router-dom";
// import Parser from 'html-react-parser';
import { useNavigate } from 'react-router-dom';
import { getCourse, removeCourse, enablecourse, } from "../../../../function/teacher/funcCourse";
import { updateProcess } from "../../../../function/student/funcCourse"
import VideoPlayer from '../../childrenComponent/VideoPlayer/VideoPlayer';
import { getQuizByCourseID } from '../../../../function/student/funcQuiz';
import { removeQuiz } from "../../../../function/teacher/funcQuiz";
import { Card } from 'antd';


const { Meta } = Card;
const CoursePageteacher = () => {
    const { id } = useParams();
    const [course, setCourse] = useState("");
    const [topic, setTopic] = useState([]);

    const [dataQuiz, setDataQuiz] = useState([]);
    const navigate = useNavigate();
    const { pathname } = useLocation();
    // const [videoEnded, setVideoEnded] = useState([{
    //     isEnded: false,
    //     duration: 0,
    //     played: 0,
    // }]);
    // const [videoAmount, setVideoAmount] = useState(0);

    const fetchQuiz = () => {
        getQuizByCourseID(sessionStorage.getItem("token"), id)
            .then((response) => {
                // console.log(response)
                setDataQuiz(response.data)
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

    const fetchCourse = () => {
        getCourse(sessionStorage.getItem("token"), id)
            .then((response) => {
                console.log(response)
                setCourse(response.data)
                setTopic(response.data.topic)
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
    // console.log(id)

    useEffect(() => {
        fetchQuiz()
        fetchCourse()
    }, []);



    const nextToCourse = (params) => {
        console.log(params)
        navigate('/teacher/edit-course/' + params)
    }
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
    const remove = (params) => {
        // console.log(params)
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            //   cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                removeCourse(sessionStorage.getItem("token"), params)
                    .then(res => {
                        // console.log(res)
                        Toast.fire({
                            icon: 'success',
                            title: 'Your Course has been deleted successfully'
                        })

                        navigate('/teacher/list-courses')
                    }).catch(err => {
                        console.log(err)
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Something went wrong!',
                        })
                    })
            }
        })

    }

    const submitRemoveQuiz = (id) =>{
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          //   cancelButtonColor: '#3085d6',
          confirmButtonText: 'Yes, delete it!'
        })
        .then((result) => {
          if (result.isConfirmed) {
            removeQuiz(sessionStorage.getItem("token"), id)
            .then(res => {
                console.log(res)
                Toast.fire({
                  icon: 'success',
                  title: 'Your Quiz has been deleted successfully'
              })
                fetchQuiz()
              }).catch(err => {
                console.log(err)
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Something went wrong!',
                  footer: '<a href="">Why do I have this issue?</a>'
                })
              })
            }
        })
    }

    const onChangeEnable = (checked) => {
        console.log(`switch to ${checked}`);
        enablecourse(sessionStorage.getItem("token"),
            {
                id: id,
                enable: checked
            })
            .then((response) => {
                // console.log(response) // test pull
                fetchCourse()
            })
            .catch((err) => {
                console.log(err)
            })
    };

    const handleVideoEnded = (data, index) => {
        // videoEnded.splice(index, 1, data)
        // console.log(videoEnded)
        // // const totalProcess = videoAmount * 100 
        // let videoProcess = [];
        // for(let i = 0 ; i < videoEnded.length ; i++) {
        //     // videoProcess += videoEnded[i].played * 100
        //     videoProcess.push(videoEnded[i].played) 
        // }
        
        // // const currentProcess = (videoProcess / totalProcess) * 100
        // updateProcess(sessionStorage.getItem("token"), {course: course._id, process: videoProcess}).then((res) => console.log(res))
    }

    const handleVideoProcess = (data, index) => {
        // videoEnded.splice(index, 1, data)
        
        
    }

    const handleRendered = (data) => {
        // setVideoAmount(data)
    }

    useEffect(() => {
        window.addEventListener("beforeunload", alertUser);
        return () => {
            window.removeEventListener("beforeunload", alertUser);
        };
    }, []);

    const alertUser = (e) => {
        e.preventDefault();
        console.log("ALEART")
    };


    return (
        <div>
            <NavTeacher />
            <div className="container ">
                {course &&
                    <>
                        <div className="d-flex justify-content-end mt-4">
                            <label className='form-label me-3'> Course Status </label>
                            <Switch defaultChecked={course.enabled} onChange={onChangeEnable} />
                        </div>
                        {course.image
                            ? <div className="card mt-3">
                                <img src={`${process.env.REACT_APP_IMG}/${course.image}`} width="100%" className="img-size-student card-img-top" />
                                <div className="card-body">
                                    <div className="mt-3 px-2">
                                        <h3 className="card-title mb-3 fw-bold">{course.name}</h3>
                                        <p className="card-text fs-6">Detail: {course.description}</p>
                                        {course.status !== "public" ?
                                            <p className="text-muted ">Teacher : {course.teacher.firstname}</p>
                                            : <div></div>
                                        }
                                    </div>
                                </div>
                            </div>
                            :
                            <div className="card mt-3">
                                <div className="card-body alert-primary">
                                    <div className="mt-3 px-2 text-dark">
                                        <h3 className="card-title mb-3 fw-bold">{course.name}</h3>
                                        <p className="card-text fs-6">Detail : {course.description}</p>
                                        {course.status !== "public" ?
                                            <p className="text-muted ">Teacher : {course.teacher.firstname}</p>
                                            : <div></div>
                                        }
                                    </div>
                                </div>
                            </div>
                        }
                    </>
                }

                
                    {
                        dataQuiz && course ? (
                            <div className="mt-2">
                                <div className="card">
                                    <div className="card-body ">
                                        <Card
                                            style={{
                                                width: "100%",
                                                borderWidth: "2px",
                                            }}
                                            actions={[
                                                // <Link class="bi bi-eye-fill h5" to={`/student/test/${dataQuiz._id}`} state={{path: pathname}}/>,
                                                <Link className="bi bi-pencil-square h5" to={`/teacher/edit-quiz/${dataQuiz._id}`}/>,
                                                <Link className="bi bi bi-trash-fill h5" onClick={() => submitRemoveQuiz(dataQuiz._id)} />
                                            ]}
                                        >
                                            <Meta
                                                title={<h4>Quiz</h4>}
                                                description={<h5>{dataQuiz.name}</h5>}
                                            />
                                        </Card>
                                    </div>
                                </div>
                            </div>
                        )
                        :
                        (
                            <div />
                        )

                }




                <div className="border bg-white my-3 ">
                    {topic && topic.map((item, index) => (
                        <div key={index} className="px-5 mt-3">

                            <h5 id="titleTopic" className="fw-bold">{item.title}</h5>
                            <div className="">
                                <p className="fs-6">{item.description}</p>

                                {item.text.length > 0 &&
                                    <div className=""><ul>
                                        {item.text.map((ttem, tdex) =>
                                            <li className="fs-6" key={tdex}>
                                                {ttem.content}
                                            </li>

                                        )}
                                    </ul>
                                    </div>
                                }
                                  {item.link.length > 0 &&
                                            <div className="container">
                                                {item.link.map((ttem, tdex) =>
                                                    ttem.url.includes("youtube.com") ?
                                                        (
                                                            <div key={tdex} className="mb-2 d-flex justify-content-center">
                                                                <iframe
                                                                    width="560"
                                                                    height="315"
                                                                    src={ttem.url.replace("watch?v=", "embed/")}
                                                                    title="YouTube video player"
                                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                                    allowFullScreen
                                                                />
                                                            </div>
                                                        )
                                                        :
                                                        (
                                                            ttem.url.includes("youtu.be") ?
                                                            (
                                                                <div key={tdex} className="mb-2 d-flex justify-content-center">
                                                                    <iframe
                                                                        width="560"
                                                                        height="315"
                                                                        src={ttem.url.replace(".be/", "be.com/embed/")}
                                                                        title="YouTube video player"
                                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                                        allowFullScreen
                                                                    />
                                                                </div>
                                                            )
                                                            :
                                                            (
                                                                <li key={tdex}>
                                                                    <a className='text-info' href={ttem.url}><i className="bi bi-link"></i>&nbsp;{ttem.name}</a>
                                                                </li>
                                                            )
                                                            
                                                            
                                                        )
                                                        
                                                )}
                                           
                                            
                                            </div>
                                        }

                                {item.file &&
                                    <div className="">
                                        {item.file.map((ttem, tdex) =>

                                            <div key={tdex} className="mb-2">
                                                {ttem.filetype === 'image/jpeg'
                                                    ? <div className="container">
                                                        <div className="d-flex justify-content-center">
                                                            <div className="w-50">
                                                                <img src={`${process.env.REACT_APP_IMG}/${ttem.filename}`} className="w-100" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    :
                                                    <>
                                                        {ttem.filetype === 'application/pdf'
                                                            ? <div>
                                                                <a href={`${process.env.REACT_APP_IMG}/${ttem.filename}`} className="text-danger size-pdf">
                                                                    <i className="bi bi-file-earmark-pdf"></i> {ttem.name}</a>
                                                            </div>
                                                            :
                                                            <>
                                                                {ttem.filetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                                                    ? <div>
                                                                        <a href={`${process.env.REACT_APP_IMG}/${ttem.filename}`} className="text-primary">
                                                                            <i className="bi bi-file-earmark-word"></i> {ttem.name}</a>
                                                                    </div>
                                                                    :
                                                                    <>
                                                                        {ttem.filetype === "image/png"
                                                                            ? <div className="container">
                                                                                <div className="d-flex justify-content-center">
                                                                                    <div className="w-50">
                                                                                        <img src={`${process.env.REACT_APP_IMG}/${ttem.filename}`} className="w-100" />
                                                                                    </div>
                                                                                </div>

                                                                            </div>
                                                                            : <>
                                                                                {ttem.filetype === "image/webp"
                                                                                    ? <div className="container">
                                                                                        <div className="d-flex justify-content-center">
                                                                                            <div className="w-50">
                                                                                                <img src={`${process.env.REACT_APP_IMG}/${ttem.filename}`} className="w-100" />
                                                                                            </div>
                                                                                        </div>

                                                                                    </div>
                                                                                    :

                                                                                    <>
                                                                                        {ttem.filetype === "video/mp4" ? (

                                                                                            <div>
                                                                                                <VideoPlayer
                                                                                                    index={tdex}
                                                                                                    videoName={ttem.name}
                                                                                                    url={`${process.env.REACT_APP_IMG}/${ttem.filename}`}
                                                                                                    disableForward={false}
                                                                                                />
                                                                                            </div>
                                                                                        )

                                                                                            // <div className="container">
                                                                                            //     <p>{(ttem.name).split('.')[0]}</p>
                                                                                            //     <div className="d-flex justify-content-center">
                                                                                            //         <div className="w-50">
                                                                                            //             <video className="w-100" controls>
                                                                                            //                 <source src={`${process.env.REACT_APP_IMG}/${ttem.filename}`}
                                                                                            //                     type={ttem.filetype} />
                                                                                            //                 Your browser does not support the video tag.
                                                                                            //             </video>
                                                                                            //         </div>
                                                                                            //     </div>

                                                                                            // </div>
                                                                                            :
                                                                                            <>
                                                                                                {ttem.filetype === "application/vnd.openxmlformats-officedocument.presentationml.presentation"
                                                                                                    ? <div>
                                                                                                        <a href={`${process.env.REACT_APP_IMG}/${ttem.filename}`} className="text-warning">
                                                                                                            <i className="bi bi-filetype-ppt"></i> {ttem.name}</a>
                                                                                                    </div>
                                                                                                    :
                                                                                                    <>
                                                                                                        <div>
                                                                                                            <a href={`${process.env.REACT_APP_IMG}/${ttem.filename}`} className="text-success">
                                                                                                            <i className="bi bi-file-arrow-down"></i> {ttem.name}</a>
                                                                                                        </div>
                                                                                                    </>
                                                                                                }
                                                                                            </>
                                                                                        }
                                                                                    </>
                                                                                }
                                                                            </>
                                                                        }
                                                                    </>
                                                                }
                                                            </>
                                                        }
                                                    </>
                                                }

                                            </div>

                                        )}

                                    </div>
                                }

                                {/* {item.quiz.length > 0 &&
                                    <div className=""><ul>
                                        {item.quiz.map((ttem, tdex) =>

                                            <li key={tdex}>
                                                <Link className="text-success" to={`/student/test/` + ttem.quiz} state={{ path: pathname }}>
                                                    <i className="bi bi-clipboard2-check"></i>&nbsp;{ttem.name}
                                                </Link>
                                            </li>

                                        )}
                                    </ul>
                                    </div>
                                } */}
                            </div>

                            <hr className="mt-4" />
                        </div>


                    ))}
                </div>
                {course.statuscourse
                
                ?<div className="row">
                <div className="col-md-8">
                    <div className="d-grid">
                        <a
                            href={`/teacher/get-course/manageuser/` + course._id}
                            className="btn btn-primary"
                        >
                            manage member
                        </a>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="d-flex justify-content-end mb-4">
                        <button
                            onClick={() => nextToCourse(course._id)}
                            className="btn btn-warning w-25"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => remove(course._id)}
                            className="btn btn-danger w-25 ms-3"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
            
            :
                <div className="d-flex justify-content-between mb-4">
                    <button
                        onClick={() => nextToCourse(course._id)}
                        className="btn btn-warning w-25"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => remove(course._id)}
                        className="btn btn-danger w-25 ms-3"
                    >
                        Delete
                    </button>
                </div>
    
            
            }
                

            </div>
        </div>
    );
}

export default CoursePageteacher