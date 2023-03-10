import { useEffect, useState } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import NavStudent from "../../layout/NavStudent";
import './student.css'
import { useNavigate } from 'react-router-dom'
import './CoursePageStudent.css'
import {
    getCourse,
    deleteMyCourse,
    updateProcess,
    getProcess,
} from "../../../function/student/funcCourse";
import { getQuizByCourseID } from "../../../function/student/funcQuiz"
import Swal from "sweetalert2";
import { Modal } from 'antd';
import VideoPlayer from '../childrenComponent/VideoPlayer/VideoPlayer';
import { Card, Progress } from 'antd';


const { Meta } = Card;
const CoursePageStudent = () => {
    // const course_id = useParams();
    const [course, setCourse] = useState("");
    const [topic, setTopic] = useState();
    const [quiz, setQuiz] = useState({});
    const [teacher, setTeacher] = useState({})
    const [videoEnded, setVideoEnded] = useState([{
        isEnded: false,
        duration: 0,
        played: 0,
    }]);
    const [videoAmount, setVideoAmount] = useState(0);
    const [studentProcess, setStudentProcess] = useState();
    const [totalProcess, setTotalProcess] = useState(0)
    const [videoProcess, setVideoProcess] = useState([]);

    const navigate = useNavigate()
    const { id } = useParams()
    const { pathname } = useLocation()

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

    const fetchQuiz = () => {
        getQuizByCourseID(sessionStorage.getItem("token"), id)
            .then((res) => {
                setQuiz(res.data)
                // setStudentProcess(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

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

    useEffect(() => {
        console.log("totalProcess:", totalProcess)
        if(totalProcess !== 100) {
            updateProcess(sessionStorage.getItem("token"), {course: course._id, completed: false})
                .then((res) => {
                    console.log(res)
                    fetchProcess();
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        else if(totalProcess === 100) {
            updateProcess(sessionStorage.getItem("token"), {course: course._id, completed: true})
                .then((res) => {
                    console.log(res)
                    fetchProcess();
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        
    }, [totalProcess, course])

    const fetchCourse = () => {
        getCourse(sessionStorage.getItem("token"), id)
            .then(async (response) => {
                console.log(response)
                setCourse(response.data)
                setTopic(response.data.topic)
                setTeacher(response.data.teacher)
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
    // const handleRemove = (id) => {
    //     // console.log(id)
    //     Swal.fire({
    //         title: 'Are you sure?',
    //         text: "You won't be able to revert this!",
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: '#d33',
    //         // cancelButtonColor: '#3085d6',
    //         confirmButtonText: 'Yes, delete it!'
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             deleteMyCourse(sessionStorage.getItem("token"),
    //                 sessionStorage.getItem("user_id"), id).then(res => {
    //                     console.log(res)
    //                     //   loadMycourse()
    //                     Toast.fire({
    //                         icon: 'success',
    //                         title: 'Your file has been deleted successfully'
    //                     })

    //                     navigate('/student/home')
    //                 }).catch(err => {
    //                     console.log(err)
    //                 })

    //         }
    //     })
    // }

    useEffect(() => {
        window.addEventListener("beforeunload", alertUser);
        return () => {
          window.removeEventListener("beforeunload", alertUser);
        };
      }, []);


    useEffect(() => {
        fetchCourse();
        fetchQuiz();
    }, []);

    

    const alertUser = (e) => {
        e.preventDefault();
        // let videoProcess = [];
        // for(let i = 0 ; i < videoEnded.length ; i++) {
        //     // videoProcess += videoEnded[i].played * 100
        //     videoProcess.push(videoEnded[i].played) 
        // }
        // const total_process = (studentProcess.process.length * 100) /  course.video_amount;
        // let completed = false
        // if(total_process === 100) {
        //     completed = true
        // }
        
        // updateProcess(sessionStorage.getItem("token"), {course: course._id, process: videoProcess, completed: completed})
        // .then((res) => {
        //     console.log(res)
        //     fetchProcess();
        // })
        // .catch((err) => {
        //     console.log(err)
        // })
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    
    const handleVideoEnded = (data, index) => {
        videoEnded.splice(index, 1, data)
        console.log("on end before update: ", videoProcess)
        
        // const totalProcess = videoAmount * 100 
        
        let complete = 0;
        for(let i = 0 ; i < videoEnded.length ; i++) {
            videoProcess.splice(index, 1, videoEnded[index].played) 
            if(videoEnded[index].played === 1) complete++;
        }
        console.log("on end updated: ", videoProcess)

        const total_process = parseInt((complete * 100) /  course.video_amount);

        let completed = false
        if(total_process === 100) {
            completed = true
        }
        console.log("is complete ->>>>> ", studentProcess.completed, complete)
        if(!studentProcess.completed) {
            updateProcess(sessionStorage.getItem("token"), {course: course._id, process: videoProcess, completed: completed})
                .then((res) => {
                    console.log(res)
                    fetchProcess();
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    const handleVideoProcess = (data, index) => {
        videoEnded.splice(index, 1, data)
    }

    const handleRendered = (index, data) => {
        setVideoAmount(data)
    }


    return (
        <div>
            <NavStudent />
            <div className="container">
                {course &&
                    <>
                        {course.image
                            ? <div className="card mt-3">
                                <img src={`${process.env.REACT_APP_IMG}/${course.image}`} width="100%" className="img-size-student card-img-top" />
                                <div className="card-body">
                                    <div className="mt-3 px-2">
                                        <h3 className="card-title mb-3 fw-bold">{course.name}</h3>
                                        <p className="card-text fs-6">Detail : {course.description}</p>
                                        {course.status !== "public" ?
                                            <div className="d-flex">
                                                {/* <p className="text-muted "> Course ID : {course.course_number}&nbsp;&nbsp;</p> */}
                                                <p className="text-muted "> Teacher :&nbsp;</p>
                                                <a onClick={showModal} className="text-info teacher-link">{course.teacher.firstname}</a>
                                                
                                            </div>
                                            
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
                                            <div className="container">
                                                {/* <p className="text-muted "> Course ID : {course.course_number}&nbsp;&nbsp;</p> */}
                                                <p className="row text-muted ">Teacher : {course.teacher.firstname}</p>
                                                {
                                                    studentProcess &&
                                                    <div className="row">
                                                        <Progress
                                                            percent={totalProcess}
                                                            strokeColor={{
                                                                "0%": "#108ee9",
                                                                "100%": "#87d068",
                                                            }}
                                                        />
                                                    </div>
                                                        
                                                }
                                            </div>
                                            
                                            : <div></div>
                                        }
                                    </div>
                                </div>
                            </div>
                        }
                    </>


                }

                    {
                        quiz && studentProcess && (
                            studentProcess.completed ? (
                                <div className="card mt-3">
                                    <div className="card-body">
                                        <Card
                                            style={{
                                                width: "100%",
                                                borderWidth: "2px",
                                            }}
                                            actions={[
                                                <Link class="bi bi-eye-fill h5" to={`/student/test/${quiz._id}`} state={{path: pathname}}/>,
                                                // <Link class="bi bi-pencil-square h5" to={`/teacher/edit-quiz/${quiz._id}`}/>,
                                            ]}
                                        >
                                            <Meta
                                                title={<h4>Quiz</h4>}
                                                description={<h5>{quiz.name}</h5>}
                                            />
                                        </Card>
                                    </div>
                                </div>
                            )
                            :
                            (
                                <div/>
                            )
                        ) 
                    }

                {course.enabled
                    ? <div>
                        <div className="border bg-white my-3 ">
                            {topic && topic.map((item, index) => (
                                <div key={index} className="px-5 mt-4">
                                    <h5 id="titleTopic" className="fw-bold">{item.title}</h5>

                                    <div className="">
                                        <p className="fs-6">{item.description}</p>
                                        {item.text.length > 0 &&
                                            <div className="">
                                                <ul>
                                                    {item.text.map((ttem, tdex) =>

                                                        <li className="fs-6" key={tdex}>
                                                            {ttem.content}
                                                        </li>

                                                    )}
                                                </ul>
                                            </div>
                                        }
                                        {item.link.length > 0 &&
                                            <div className=""><ul>
                                                {item.link.map((ttem, tdex) =>

                                                    <li key={tdex}>
                                                        <a className='text-info' href={ttem.url}><i className="bi bi-link"></i>&nbsp;{ttem.name}</a>
                                                    </li>

                                                )}
                                            </ul>
                                            </div>
                                        }
                                        {item.file.length > 0 &&
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
                                                                                        {ttem.filetype == "image/webp"
                                                                                            ? <div className="container">
                                                                                                <div className="d-flex justify-content-center">
                                                                                                    <div className="w-50">
                                                                                                        <img src={`${process.env.REACT_APP_IMG}/${ttem.filename}`} className="w-100" />
                                                                                                    </div>
                                                                                                </div>

                                                                                            </div>
                                                                                            :

                                                                                            <>

                                                                                                {studentProcess && ttem.filetype == "video/mp4" ?
                                                                                                    <VideoPlayer
                                                                                                        index={tdex}
                                                                                                        videoName={ttem.name}
                                                                                                        url={`${process.env.REACT_APP_IMG}/${ttem.filename}`}
                                                                                                        disableForward={true}
                                                                                                        onEnded={handleVideoEnded}
                                                                                                        onProcess={handleVideoProcess}
                                                                                                        onRender={handleRendered}
                                                                                                        isComplete={studentProcess.process[tdex]}
                                                                                                    />
                                                                                                    
                                                                                                    //  <div className="container">
                                                                                                    //     {/* <p>{(ttem.name).split('.')[0]}</p> */}
                                                                                                    //     <div className="d-flex justify-content-center">
                                                                                                    //         {/* <div className="w-50"> */}
                                                                                                    //             <video className="w-75" controls>
                                                                                                    //                 <source src={`${process.env.REACT_APP_IMG}/${ttem.filename}`}
                                                                                                    //                     type={ttem.filetype} />
                                                                                                    //                 Your browser does not support the video tag.
                                                                                                    //             </video>
                                                                                                    //         {/* </div> */}
                                                                                                    //     </div>

                                                                                                    // </div>
                                                                                                    :
                                                                                                    <>
                                                                                                        {ttem.filetype === "application/vnd.openxmlformats-officedocument.presentationml.presentation" ?
                                                                                                            <div>
                                                                                                                <a href={`${process.env.REACT_APP_IMG}/${ttem.filename}`} className="text-warning">
                                                                                                                    <i className="bi bi-filetype-ppt"></i> {ttem.name}</a>
                                                                                                            </div>
                                                                                                            :
                                                                                                            <>

                                                                                                                <div>
                                                                                                                    <a href={`${process.env.REACT_APP_IMG}/${ttem.filename}`} className="text-success">
                                                                                                                    <i className="bi bi-file-arrow-down"></i>  {ttem.name}</a>
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
                                    </div>



                                    <hr className="mt-5 mb-4 text-secondary" />
                                </div>
                            ))}
                        </div>

                        {/* {course.password == ""
                            ? <></>
                            : <div className="mb-5 mt-3">
                                <button className="btn btn-danger" type="button"
                                    onClick={() => handleRemove(id)}
                                > Leave course </button>
                            </div>
                        } */}
                        <Modal title={`Teacher : ${teacher.firstname} ${teacher.lastname}`} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={[]}>
                            <div className="row p-2">
                                <div className="col-md-6 mt-2">
                                    <img src={`${process.env.REACT_APP_IMG}/${teacher.profile}`} className="w-100" />
                                </div>
                                <div className="col-md-6 mt-2">
                                    <h6><label className="form-label">Email</label></h6>
                                    {!teacher.email
                                        ? <p>-</p>
                                        : <p>{teacher.email}</p>
                                    }
                                    <h6><label className="form-label">Tel</label></h6>
                                    {!teacher.tel
                                        ? <p>-</p>
                                        : <p>{teacher.tel}</p>
                                    }
                                </div>
                            </div>
                        </Modal>
                    </div>
                    :
                    (
                        <div className="border bg-white my-3 p-4">
                            <p className="text-center text-danger">This course is now not available, plase try again later</p>
                        </div>
                    )
                }




            </div>

        </div>
    );
}

export default CoursePageStudent;