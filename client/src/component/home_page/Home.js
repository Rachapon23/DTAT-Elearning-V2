import React from 'react'
import './homepage.css'
import Carousel from './Carousel'
import { useState, useEffect } from "react";
import {

    listHome,

} from '../../function/admin/funcHome';
import { useNavigate } from "react-router-dom";
import NavHome from './NavHome';


const Home = () => {
    const [open, setOpen] = useState(false);

    const [reGisCoursedata, setReGisCoursedata] = useState([])
    const [coursedata, setCoursedata] = useState([]);
    const [carouseldata, setCarouseldata] = useState([]);
    const navigate = useNavigate();
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
const checkToken = (id) =>{

        
        if(!!sessionStorage.getItem('token')){
navigate('/course-home/'+id)
        }else{
            setOpen(true)
        }
        // console.log(id)
      
}
    return (
        <div className="black-g-home">
          
            <NavHome setOpen={setOpen} open={open}/>
            <div className=''>
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
                            <label className="form-label">Interesting Course</label>
                            <div className="row">
                                {coursedata.map((course, index) =>
                                    <div className="col-md-4 p-2 course-home" key={index}>
                                        <div className="card shadow-sm "
                                        onClick={()=>checkToken(course._id)}
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
                    <div className="body-content-2 mt-5 ">
                        <div className="container">
                            <label className="form-label">Open for Registration</label>
                            <div className="row ">
                                {reGisCoursedata.map((course, index) =>
                                    <div className="col-md-4 p-2 course-home" key={index}>
                                        <div className="card shadow-sm "
                                        onClick={()=>checkToken(course._id)}
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
          
                </div>

        </div>
    )
}

export default Home