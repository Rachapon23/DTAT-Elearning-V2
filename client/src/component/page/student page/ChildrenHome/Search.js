import React from 'react'
import { useState, useEffect } from 'react'
import { Searchcourse, Addchcourse } from '../../../../function/student/funcCourse'
import Swal from 'sweetalert2'
import '../student.css'

const Search = ({ loadMycourse }) => {

    const [query, SetQuery] = useState({
        query: ""
    })
    const [data, setData] = useState([])
    const [dataload, setDataload] = useState(false)
    const handleChange = (e) => {
        SetQuery({ ...query, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e) => {
        // e.preventDefault();
        // console.log(query)
        if (!!!query.query) {
            Swal.fire(
                {
                    title: 'Are you about to search course?',
                    text: "Please fill course ID",
                    icon: 'question',
                    confirmButtonColor: '#0d6efd',
                    confirmButtonText: 'try again'
                }
            )
        } else {
            Searchcourse(sessionStorage.getItem("token"), query)
                .then(res => {
                    console.log(res)
                    setData(res.data)
                    setDataload(true)
                }).catch(err => {
                    console.log(err)
                    setDataload(true)
                })
        }

    };

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

    const handleAddcourse = (id) => {
        // e.preventDefault();

        Swal.fire({
            title: 'Enter course password',
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'enroll',
            confirmButtonColor: '#28a745',
            showLoaderOnConfirm: true,
            preConfirm: (password) => {
                const course_id = {
                    id: id,
                    id_user: sessionStorage.getItem('user_id'),
                    password: password
                }
                return (

                    Addchcourse(sessionStorage.getItem("token"), course_id)
                        .then(res => {
                            console.log(res)

                            loadMycourse()
                            Toast.fire({
                                icon: 'success',
                                title: 'Signed in successfully'
                            })
                        }).catch(err => {
                            if (err.response.data == "Password Invalid!!!"
                            ) {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Error',
                                    text: 'Password not correct',
                                    confirmButtonColor: '#0d6efd',
                                    confirmButtonText: 'try again'
                                })
                            } else if (err.response.data == "course already exist") {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: 'You already enrolled this course',
                                    confirmButtonColor: '#0d6efd',
                                    confirmButtonText: 'try again'
                                })
                            } else {
                                console.log(err)
                            }

                        }))
            },

        })
    };
    // console.log(data)

    const entertext = (e) => {
        if (e.key === 'Enter') {
            handleSubmit()
        }
    }

    return (
        <div>

            <div className="row">
                <div className="col-md-8">

                    <div className="input-group">
                        <input type="text" name='query' onKeyDown={entertext}
                            className="form-control" onChange={handleChange} />
                        <button onClick={handleSubmit}
                            className="btn btn-danger" type="button"><i className="bi bi-search"></i></button>
                    </div>
                </div>
            </div>
            <div>

                {data.length == 0
                    ? <>
                        {dataload &&
                            <p className='mt-2'> No course found on your search</p>
                        }
                    </>
                    : <> <div className="row mt-3">
                        {data && data.map((course, index) => (

                            <div className="" key={index}>
                                {course.enabled &&
                                    <div className="">
                                        <div className="card text-white bg-secondary p-0">
                                            {!!course.image
                                                ? <img src={`${process.env.REACT_APP_IMG}/${course.image}`} className="card-img w-100" />
                                                : <img src="/book-main-img-3.png" className="card-img-top w-100" />
                                            }

                                            <div className="card-img-overlay overlay">
                                                {/* <p className="card-title fw-bold">วิชา : {course.name}</p> */}
                                                {course.name.length > 55
                                                    ? <p className="card-title fw-bold size-title">{(course.name).substring(0, 55)} ...</p>
                                                    : <p className="card-title fw-bold size-title">{(course.name)}</p>
                                                }
                                                <p className="mb-0">Course ID :  {course.course_number} </p>
                                                {/* <p className="">ผู้สอน : {course.teacher.firstname}</p> */}
                                            </div>
                                        </div>
                                        <div className="d-grid mb-2">
                                            <button className="btn btn-outline-secondary btn-sm"
                                                onClick={() => handleAddcourse(course._id)}
                                            >Enroll</button>
                                        </div>
                                    </div>
                                }
                            </div>
                        ))
                        }
                    </div>
                    </>
                }
            </div>

        </div>
    )
}

export default Search