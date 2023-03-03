import React from 'react'
import { publicCourses } from '../../../../function/student/funcCourse'
import { useState, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
// import '../student.css'
import './PublicCourse.css'


const PublicCourse = () => {
    const navigate = useNavigate()
    const [data, setData] = useState([])

    const loadData = () => {
        publicCourses(sessionStorage.getItem("token")).then(res => {
            console.log(res)
            setData(res.data)
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
            {data.map((item, index) => (
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
                                    {/* <p className="card-text my-0 fs-6">รายละเอียด : {(item.description).substring(0, 130)}...</p> */}
                                    <p id='text-p-6' className="card-text mt-1 "><i className="bi bi-hand-index"></i>&nbsp; Click to study </p>
                                </div>
                            </div>
                        </div>
                        : <></>
                    }
                </>

            )


                // <div className="col-md-6 mb-2 " key={index}>
                //     {item.enabled &&
                //         <div>
                //             <div className="card back-public-2 shadow-sm back-public-black-2" onClick={() => nextToCourse(item._id)}>
                //                 {item.image
                //                     ? <img src={`${process.env.REACT_APP_IMG}/${item.image}`} className="card-img-top w-100" />
                //                     : <img src="/book-main-img-3.png" className="card-img-top w-100" />
                //                 }

                //                 <div className="card-body ">
                //                     <h5 className="card-title mb-1 fw-bold">{item.name}</h5>
                //                     {item.description.length > 130
                //                         ? <p className="card-text my-0 fs-6">รายละเอียด : {(item.description).substring(0, 130)} . . .</p>
                //                         : <p className="card-text my-0 fs-6">รายละเอียด : {(item.description)}</p>
                //                     }
                //                     {/* <p className="card-text my-0 fs-6">รายละเอียด : {(item.description).substring(0, 130)}...</p> */}
                //                     <p id='text-p-6' className="card-text mt-1 "><i className="bi bi-hand-index"></i>&nbsp;คลิกเพื่อเข้าเรียน </p>
                //                 </div>
                //             </div>
                //         </div>

                //     }</div>

            )}

        </div>
    )
}

export default PublicCourse