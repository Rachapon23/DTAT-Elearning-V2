import React from 'react'
import Swal from 'sweetalert2'
import { Navigate, useNavigate } from 'react-router-dom'
import '../student.css'



const Mycourse = ({ item, loadMycourse }) => {

  const navigate = useNavigate()

  const nextToCourse = (params) => {
    // console.log(params)
    if (item.enabled) {
      navigate('/student/get-course/' + params)
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'This course is now not available, plase try again later',
      })
    }

  }

  return (

    <div className="col-md-3" >
      <div className="card mt-3 card-h back-public-2 shadow-sm back-public-black-2" onClick={() => nextToCourse(item._id)}>
        {!!item.image
          ? <img src={`${process.env.REACT_APP_IMG}/${item.image}`} className="card-img-top resize " />
          : <img src="/book-main-img-3.png" className="card-img-top w-100" />
        }
        <div className="card-body ">
          <h5 className="card-title">{item.name}</h5>
          {/* <p style={{ fontSize: '14px' }} className="card-text text-muted mb-0">Course ID : {item.course_number}</p> */}
          {item.description.length < 45
            ? <p style={{ fontSize: '14px' }} className="card-text text-muted">Detail : {(item.description)}</p>
            : <p style={{ fontSize: '14px' }} className="card-text text-muted">Detail : {(item.description.substring(0, 45))}...</p>
          }
        </div>
      </div>
    </div>

  )
}

export default Mycourse