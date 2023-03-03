import React from 'react'
import { useState, useEffect } from "react";
import NavAdmin from '../../layout/NavAdmin'
import {
    carousel,
    postcourse,
    listHome,
    removeCarousel,
    listCourse,
    postReGiscourse,
    removeCourse,
    removeCourse2,
} from '../../../function/admin/funcHome';
import Swal from "sweetalert2";
import './admin.css'

const ManageHome = () => {


    const [idRegis, setIdRegis] = useState("");
    const [idHome, setIdHome] = useState("");
    const [carouseldata, setCarouseldata] = useState([]);
    const [courseSelect, setCourseSelect] = useState([]);
    const [coursedata, setCoursedata] = useState([]);
    const [course, setCourse] = useState("");


    const [file, setFile] = useState();
    const [filetype, setFiletype] = useState("");
    const [courseupload, setCourseUpload] = useState()

    const [reGisCourse, setReGisCourse] = useState()
    const [reGisCoursedata, setReGisCoursedata] = useState([])


    const submitCacousel = () => {
        if (carouseldata.length >= 3) {
            // ควรมี middle ware ตรวจสอบด้วย
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'image carousel max length = 3',
            })
        } else {

            const formData = new FormData();
            formData.append('file', file)
            formData.append('id', idHome)
            carousel(sessionStorage.getItem("token"), formData)
                .then(res => {
                    console.log(res)
                    loadData()
                    Toast.fire({
                        icon: 'success',
                        title: 'Your carousel upload successfully'
                    })
                }).catch(err => {
                    console.log(err)
                })
        }
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
    const loadData = () => {
        listHome(sessionStorage.getItem("token")).then(res => {
            console.log(res.data)
            setIdHome(res.data.home[0]._id)
            setIdRegis(res.data.regis[0]._id)
            setCarouseldata(res.data.home[0].carousel)
            setCoursedata(res.data.home[0].coursee)
            setReGisCoursedata(res.data.regis[0].coursee)
        }).catch(err => {
            console.log(err)
        })
    }
    const loadCourse = () => {
        listCourse(sessionStorage.getItem("token")).then(res => {
            // console.log(res)
            setCourseSelect(res.data)
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        loadData()
        loadCourse()
    }, [])
    const handleRemoveCourse = (index) => {
        console.log(index)
        removeCourse(sessionStorage.getItem("token"),
            {
                id: idHome,
                index: index
            }

        ).then(res => {
            console.log(res)
            loadData()
            Toast.fire({
                icon: 'success',
                title: 'Your carousel has been deleted successfully'
            })
        }).catch(err => {
            console.log(err)
        })
    }
    const handleRemoveCourse2 = (index) => {
        console.log(index)
        removeCourse2(sessionStorage.getItem("token"),
        {
            id: idRegis,
            index: index
        }

    ).then(res => {
        console.log(res)
        loadData()
        Toast.fire({
            icon: 'success',
            title: 'Your carousel has been deleted successfully'
        })
    }).catch(err => {
        console.log(err)
    })
       
    }
    const handleRemoveIMG = (index) => {

        removeCarousel(sessionStorage.getItem("token"),
            {
                id: idHome,
                index: index
            }

        ).then(res => {
            console.log(res)
            loadData()
            Toast.fire({
                icon: 'success',
                title: 'Your carousel has been deleted successfully'
            })
        }).catch(err => {
            console.log(err)
        })

    }
    const handleSubmitCourse = () => {
        // console.log(courseupload)
        if (coursedata.length >= 5) {
            // ควรมี middle ware ตรวจสอบด้วย
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'course max length = 5',
            })
        } else {

            postcourse(sessionStorage.getItem("token"),
                {
                    id: idHome,
                    id_course: course
                })
                .then(res => {
                    console.log(res)
                    loadData()
                    Toast.fire({
                        icon: 'success',
                        title: 'Your carousel upload successfully'
                    })
                }).catch(err => {
                    console.log(err)
                })
        }
    }
    const handleSubmitRegisterCourse = () => {

        if (reGisCoursedata.length >= 5) {
            // ควรมี middle ware ตรวจสอบด้วย
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'register course max length = 5',
            })
        } else {

            postReGiscourse(sessionStorage.getItem("token")
                ,
                {
                    id: idRegis,
                    id_course: reGisCourse
                }
            )
                .then(res => {
                    console.log(res)
                    loadData()
                    Toast.fire({
                        icon: 'success',
                        title: 'Your carousel upload successfully'
                    })
                }).catch(err => {
                    console.log(err)
                })
        }
    }

    return (
        <div>
            <NavAdmin />
            <div className='container'>
                <div className='mt-5'>
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title">Manage Carousel</h3>
                            <hr />
                            <div className="form-group">
                                <label className="form-label">upload image</label>
                                <input type="file" className="form-control" 
                                    onChange={
                                        (e) => {
                                            // console.log(e.target.files[0].type)
                                            setFile(e.target.files[0])
                                            setFiletype(e.target.files[0].type)
                                        }
                                    }
                                />
                                <p className='text-end mt-2' style={{ fontSize: "12px" }}> recommend size 820px * 312px </p>
                                <div className="mt-3">
                                    <ul>

                                        <li>
                                            image 1 : {!!carouseldata[0] && <i id='remove' className="bi bi-trash text-danger"
                                                onClick={() => handleRemoveIMG(0)}>
                                            </i>}


                                            {!!carouseldata[0] ?

                                                <div className="d-flex justify-content-center">
                                                    <div className="w-25">
                                                        <img src={`${process.env.REACT_APP_IMG}/${carouseldata[0]}`} className="w-100" />
                                                    </div>
                                                </div>
                                                :
                                                <div className="d-flex justify-content-center">
                                                    <h1>
                                                        <i className="bi bi-image-fill text-muted"></i>
                                                    </h1>
                                                </div>
                                            }
                                        </li>

                                        <li>
                                            image 2 : {!!carouseldata[1] && <i id='remove' className="bi bi-trash text-danger"
                                                onClick={() => handleRemoveIMG(1)}>
                                            </i>}


                                            {!!carouseldata[1] ?

                                                <div className="d-flex justify-content-center">
                                                    <div className="w-25">
                                                        <img src={`${process.env.REACT_APP_IMG}/${carouseldata[1]}`} className="w-100" />
                                                    </div>
                                                </div>
                                                :
                                                <div className="d-flex justify-content-center">
                                                    <h1>
                                                        <i className="bi bi-image-fill text-muted"></i>
                                                    </h1>
                                                </div>
                                            }
                                        </li>

                                        <li>
                                            image 3 : {!!carouseldata[2] && <i id='remove' className="bi bi-trash text-danger"
                                                onClick={() => handleRemoveIMG(2)}>
                                            </i>}


                                            {!!carouseldata[2] ?

                                                <div className="d-flex justify-content-center">
                                                    <div className="w-25">
                                                        <img src={`${process.env.REACT_APP_IMG}/${carouseldata[2]}`} className="w-100" />
                                                    </div>
                                                </div>
                                                :
                                                <div className="d-flex justify-content-center">
                                                    <h1>
                                                        <i className="bi bi-image-fill text-muted"></i>
                                                    </h1>
                                                </div>
                                            }
                                        </li>

                                    </ul>
                                </div>
                            </div>
                            <div className="d-grid">
                                <button className="btn btn-outline-success"
                                    onClick={submitCacousel} disabled={!file}
                                >upload</button>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="card mt-3">
                    <div className="card-body">
                        <h3 className="card-title">Manage course</h3>
                        <hr />
                        <div className="form-group">
                            <label className="form-label">select course</label>
                            <div className="input-group">
                                <select name="" id="" className="form-select"
                                    onChange={(e) => {
                                        setCourse(e.target.value)
                                    }}
                                >
                                    <option value="" className='text-muted'>select</option>
                                    {courseSelect.map((item, index) =>
                                        <option key={index} value={item._id}>{item.name}</option>
                                    )}
                                </select>
                                <button onClick={handleSubmitCourse}
                                    className="btn btn-outline-success">add course</button>
                            </div>
                        </div>
                        <div className="mt-3">
                            <ul>
                                <li>course 1 : {!!coursedata[0] && <i id='remove' className="bi bi-trash text-danger"
                                    onClick={() => handleRemoveCourse(0)}>
                                </i>}
                                    {!!coursedata[0]
                                        ? <p>{coursedata[0].name}</p>
                                        : <p>-</p>
                                    }
                                </li>
                                <li>course 2 : {!!coursedata[1] && <i id='remove' className="bi bi-trash text-danger"
                                    onClick={() => handleRemoveCourse(1)}>
                                </i>}
                                    {!!coursedata[1]
                                        ? <p>{coursedata[1].name}</p>
                                        : <p>-</p>
                                    }
                                </li>
                                <li>course 3 : {!!coursedata[2] && <i id='remove' className="bi bi-trash text-danger"
                                    onClick={() => handleRemoveCourse(2)}>
                                </i>}
                                    {!!coursedata[2]
                                        ? <p>{coursedata[2].name}</p>
                                        : <p>-</p>
                                    }
                                </li>
                                <li>course 4 : {!!coursedata[3] && <i id='remove' className="bi bi-trash text-danger"
                                    onClick={() => handleRemoveCourse(3)}>
                                </i>}
                                    {!!coursedata[3]
                                        ? <p>{coursedata[3].name}</p>
                                        : <p>-</p>
                                    }
                                </li>
                                <li>course 5 : {!!coursedata[4] && <i id='remove' className="bi bi-trash text-danger"
                                    onClick={() => handleRemoveCourse(4)}>
                                </i>}
                                    {!!coursedata[4]
                                        ? <p>{coursedata[4].name}</p>
                                        : <p>-</p>
                                    }
                                </li>

                            </ul>
                        </div>
                    </div>
                </div>
                <div className="card my-3">
                    <div className="card-body">
                        <h3 className="card-title">Manage open for registration</h3>
                        <hr />
                        <div className="form-group">
                            <label className="form-label">select course</label>
                            <div className="input-group">
                                <select name="" id="" className="form-select"
                                    onChange={(e) => {
                                        setReGisCourse(e.target.value)
                                    }}
                                >
                                    <option value="" className='text-muted'>select</option>
                                    {courseSelect.map((item, index) =>
                                        <option key={index} value={item._id}>{item.name}</option>
                                    )}
                                </select>
                                <button onClick={handleSubmitRegisterCourse}
                                    className="btn btn-outline-success">add register course</button>
                            </div>
                        </div>
                        <div className="mt-3">
                            <ul>
                                <li>course 1 : {!!reGisCoursedata[0] && <i id='remove' className="bi bi-trash text-danger"
                                    onClick={() => handleRemoveCourse2(0)}>
                                </i>}
                                    {!!reGisCoursedata[0]
                                        ? <p>{reGisCoursedata[0].name}</p>
                                        : <p>-</p>
                                    }
                                </li>
                                <li>course 2 : {!!reGisCoursedata[1] && <i id='remove' className="bi bi-trash text-danger"
                                    onClick={() => handleRemoveCourse2(1)}>
                                </i>}
                                    {!!reGisCoursedata[1]
                                        ? <p>{reGisCoursedata[1].name}</p>
                                        : <p>-</p>
                                    }
                                </li>
                                <li>course 3 : {!!reGisCoursedata[2] && <i id='remove' className="bi bi-trash text-danger"
                                    onClick={() => handleRemoveCourse2(2)}>
                                </i>}
                                    {!!reGisCoursedata[2]
                                        ? <p>{reGisCoursedata[2].name}</p>
                                        : <p>-</p>
                                    }
                                </li>
                                <li>course 4 : {!!reGisCoursedata[3] && <i id='remove' className="bi bi-trash text-danger"
                                    onClick={() => handleRemoveCourse2(3)}>
                                </i>}
                                    {!!reGisCoursedata[3]
                                        ? <p>{reGisCoursedata[3].name}</p>
                                        : <p>-</p>
                                    }
                                </li>
                                <li>course 5 : {!!reGisCoursedata[4] && <i id='remove' className="bi bi-trash text-danger"
                                    onClick={() => handleRemoveCourse2(4)}>
                                </i>}
                                    {!!reGisCoursedata[4]
                                        ? <p>{reGisCoursedata[4].name}</p>
                                        : <p>-</p>
                                    }
                                </li>

                            </ul>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default ManageHome