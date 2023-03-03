import { useEffect, useState } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import NavStudent from "../../layout/NavStudent";
import './student.css'
import { useNavigate } from 'react-router-dom'
import './CoursePageStudent.css'
import {
    getCourse
    , deleteMyCourse
} from "../../../function/student/funcCourse";
import Swal from "sweetalert2";

import { Modal } from 'antd';

const CoursePageStudent = () => {
    // const course_id = useParams();
    const [course, setCourse] = useState("");
    const [topic, setTopic] = useState();
    const [dataQuiz, setDataQuiz] = useState([])
    const [teacher, setTeacher] = useState({})

    const navigate = useNavigate()
    const { id } = useParams()
    const { pathname } = useLocation()

    const fetchCourse = () => {
        getCourse(sessionStorage.getItem("token"), id)
            .then((response) => {
                console.log(response)
                setCourse(response.data)
                setTopic(response.data.topic)
                setTeacher(response.data.teacher)
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
    const handleRemove = (id) => {
        // console.log(id)
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            // cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteMyCourse(sessionStorage.getItem("token"),
                    sessionStorage.getItem("user_id"), id).then(res => {
                        console.log(res)
                        //   loadMycourse()
                        Toast.fire({
                            icon: 'success',
                            title: 'Your file has been deleted successfully'
                        })

                        navigate('/student/home')
                    }).catch(err => {
                        console.log(err)
                    })

            }
        })
    }

    useEffect(() => {
        fetchCourse()
    }, []);

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


    return (
        <div>
            <NavStudent />
            <div className="container ">
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
                                                <p className="text-muted "> Course ID : {course.course_number}&nbsp;&nbsp;</p>
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
                                            <div className="d-flex">
                                                <p className="text-muted "> Course ID : {course.course_number}&nbsp;&nbsp;</p>
                                                <p className="text-muted ">Teacher : {course.teacher.firstname}</p>
                                            </div>

                                            : <div></div>
                                        }
                                    </div>
                                </div>
                            </div>
                        }
                    </>


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
                                                                                                {ttem.filetype == "video/mp4"
                                                                                                    ? <div className="container">
                                                                                                        {/* <p>{(ttem.name).split('.')[0]}</p> */}
                                                                                                        <div className="d-flex justify-content-center">
                                                                                                            {/* <div className="w-50"> */}
                                                                                                                <video className="w-75" controls>
                                                                                                                    <source src={`${process.env.REACT_APP_IMG}/${ttem.filename}`}
                                                                                                                        type={ttem.filetype} />
                                                                                                                    Your browser does not support the video tag.
                                                                                                                </video>
                                                                                                            {/* </div> */}
                                                                                                        </div>

                                                                                                    </div>
                                                                                                    :
                                                                                                    <>
                                                                                                    {ttem.filetype === "application/vnd.openxmlformats-officedocument.presentationml.presentation"
                                                                                                        ? <div>
                                                                                                            <a href={`${process.env.REACT_APP_IMG}/${ttem.filename}`} className="text-warning">
                                                                                                                <i className="bi bi-filetype-ppt"></i> {ttem.name}</a>
                                                                                                        </div>
                                                                                                        :
                                                                                                        <>
    
                                                                                                            <p>Cannot read file</p>
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
                                        {item.quiz.length > 0 &&
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
                                        }
                                    </div>


                                    <hr className="mt-5 mb-4 text-secondary" />
                                </div>
                            ))}
                        </div>
                        {course.password == ""
                            ? <></>
                            : <div className="mb-5">
                                <button className="btn btn-danger" type="button"
                                    onClick={() => handleRemove(id)}
                                > Leave course </button>
                            </div>
                        }
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
                    <div className="border bg-white my-3 p-4">
                        <p className="text-center text-danger">This course is now not available, plase try again later</p>
                    </div>
                }




            </div>

        </div>
    );
}

export default CoursePageStudent;