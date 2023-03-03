import React from 'react'
import './homepage.css'
import Carousel from './Carousel'
import { useState, useEffect } from "react";
import {

    listHome,

} from '../../function/admin/funcHome';



const Home = () => {
    const [reGisCoursedata, setReGisCoursedata] = useState([])
    const [coursedata, setCoursedata] = useState([]);
    const [carouseldata, setCarouseldata] = useState([]);

    useEffect(() => {
        loadData()

    }, [])

    const loadData = () => {
        listHome(sessionStorage.getItem("token")).then(res => {
            console.log(res.data)

            setCarouseldata(res.data.home[0].carousel)
            setCoursedata(res.data.home[0].coursee)
            setReGisCoursedata(res.data.regis[0].coursee)
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div>
            <nav className="navbar navbar-light  bg-nav d-flex justify-content-between px-5">
                <a className="navbar-brand text-white brand" href="/login">
                    <img src="navbrand3.png" className="logo-nav" />&nbsp;
                </a>
                <a href="/">logout</a>
            </nav>
            <div className="black-g-home py-5">
                <div className="content ">
                    <div className="head-content">
                        <div className="d-flex justify-content-center">
                            <div className="w-75 shadow-sm">
                                {carouseldata.length > 0 &&
                                    <Carousel carouseldata={carouseldata} />
                                }
                            </div>
                        </div>
                    </div>
                    <div className="body-content mt-5">
                        <div className="container">
                            <label className="form-label">interesting course</label>
                            <div className="row">
                                {coursedata.map((course, index) =>
                                    <div className="col-md-4 p-2" key={index}>
                                        <div className="card back-public-2 shadow-sm back-public-black-2"
                                        //   onClick={() => nextToCourse(course._id)}
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
                                <div className="col-md-4 p-2">
                                    <div className="card back-public-2 shadow-sm back-public-black-2"
                                    //   onClick={() => nextToCourse(course._id)}
                                    >
                                        <div className="card-body ">
                                            <p className="card-title">shoe more +</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="body-content-2 mt-5 ">
                        <div className="container">
                            <label className="form-label">open for registration</label>
                            <div className="row ">
                                {coursedata.map((course, index) =>
                                    <div className="col-md-4 p-2" key={index}>
                                        <div className="card back-public-2 shadow-sm back-public-black-2"
                                        //   onClick={() => nextToCourse(course._id)}
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
                                <div className="col-md-4 p-2">
                                    <div className="card back-public-2 shadow-sm back-public-black-2"
                                    //   onClick={() => nextToCourse(course._id)}
                                    >
                                        <div className="card-body ">
                                            <p className="card-title">shoe more +</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Home