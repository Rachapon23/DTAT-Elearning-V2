import React from 'react'
// import { publicCourses } from '../../../../function/student/funcCourse'
import { useState, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
// import '../student.css'
import './PublicCourse.css'

import {

    listHome,

} from '../../../../function/admin/funcHome';
const PublicCourse = () => {
    const navigate = useNavigate()
    const [reGisCoursedata, setReGisCoursedata] = useState([])
    const [coursedata, setCoursedata] = useState([]);

    const loadData = () => {
        listHome(sessionStorage.getItem("token")).then(res => {
            // console.log(res.data)
            setCoursedata(res.data.home[0].coursee)
            setReGisCoursedata(res.data.regis[0].coursee)
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        loadData()
    }, [])

    const nextToCourse = (params) => {
        console.log(params)
        navigate('/student/get-course/' + params)
    }

    return (
        <div className='row'>
            {/* {data.map((item, index) => (
                <>
                    {item.enabled
                        ?
                        <div className="col-md-6 my-2" >
                            <div className="card back-public-2 shadow-sm back-public-black-2" onClick={() => nextToCourse(item._id)}>
                                {item.image
                                    ? <img src={`${process.env.REACT_APP_IMG}/${item.image}`} className="card-img-top w-100" />
                                    : <img src="/book-main-img-3.png" className="card-img-top w-100" />
                                }

                                <div className="card-body ">
                                    <h5 className="card-title mb-1 fw-bold">{item.name}</h5>
                                    {item.description.length > 130
                                        ? <p className="card-text my-0 fs-6">Detail : {(item.description).substring(0, 130)} . . .</p>
                                        : <p className="card-text my-0 fs-6">Detail : {(item.description)}</p>
                                    }
                                    
                                    <p id='text-p-6' className="card-text mt-1 "><i className="bi bi-hand-index"></i>&nbsp; Click to study </p>
                                </div>
                            </div>
                        </div>
                        : <></>
                    }
                </>

            )


            )} */}
                    <div className="body-content mt-3">
                        <div className="container">
                            <label className="form-label">interesting course</label>
                            <div className="row">
                                {coursedata.map((course, index) =>
                                    <div className="col-md-4 p-2 course-home" key={index}>
                                        <div className="card shadow-sm "
                                        onClick={() => {
                                            navigate('/course-home/'+course._id)
                                          }}
                                        >
                                            {course.image
                                                ? <img src={`${process.env.REACT_APP_IMG}/${course.image}`} className="card-img-top w-100" />
                                                : <img src="/book-main-img-3.png" className="card-img-top w-100" />
                                            }
                                            <div className="card-body ">
                                                <div className="d-flex justify-content-between">
                                                    <p className="card-title mb-0">{course.name}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div className="col-md-4 p-2 course-home">
                                    <div className="card shadow-sm"
                                    onClick={() => {
                                        navigate('/public-course')
                                      }}
                                    >
                                        <div className="card-body ">
                                            <p className="card-title">show more +</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="body-content-2 mt-3 ">
                        <div className="container">
                            <label className="form-label">open for registration</label>
                            <div className="row ">
                                {reGisCoursedata.map((course, index) =>
                                    <div className="col-md-4 p-2 course-home" key={index}>
                                        <div className="card shadow-sm "
                                        onClick={() => {
                                            navigate('/course-home/'+course._id)
                                          }}
                                        >
                                            {course.image
                                                ? <img src={`${process.env.REACT_APP_IMG}/${course.image}`} className="card-img-top w-100" />
                                                : <img src="/book-main-img-3.png" className="card-img-top w-100" />
                                            }
                                            <div className="card-body ">
                                                <div className="d-flex justify-content-between">
                                                    <p className="card-title mb-0">{course.name}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div className="col-md-4 p-2 course-home">
                                    <div className="card shadow-sm "
                                      onClick={() => {
                                        navigate('/private-course')
                                      }}
                                    >
                                        <div className="card-body ">
                                            <p className="card-title">show more +</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
        </div>
    )
}

export default PublicCourse