import React from 'react'
import NavAdmin from '../../layout/NavAdmin'
import './admin.css'
import { useNavigate } from 'react-router-dom'

const HomePageAdmin = () => {
  const navigate = useNavigate()
  const teacher = () => {
    navigate('/teacher/home')
  }
  const student = () => {
    navigate('/student/home')
  }
  return (
    <div>
      <NavAdmin />
      <div className="container mt-3">
        {/* <h1>
          HOME
        </h1> */}
        <div className="mt-5">
          <div className="row">
            {/* <ul>
              <li>
                <a href="/teacher/home">teacher page</a>
              </li>
              <li>
                <a href="/student/home">student page</a>
              </li>
            </ul> */}
            <div className="col-md-6">
              <div className="card card-img-teacher shadow-sm"  onClick={teacher}>
                <div className="card-img-overlay">
                  <p className="card-title">Go to Teacer page</p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card card-img-student shadow-sm" onClick={student}>
                <div className="card-img-overlay">
                  <p className="card-title">Go to Student page</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>


    </div>
  )
}

export default HomePageAdmin