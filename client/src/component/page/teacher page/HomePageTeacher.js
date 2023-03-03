import React from 'react'
import NavTeacher from '../../layout/NavTeacher'
import { useState, useEffect } from 'react'
import { getMyaccount, uploadProfile, updateProfile } from '../../../function/teacher/funcMiscellaneous'
import { getmyCourseTeacher } from '../../../function/teacher/funcCourse';
import { listQuiz } from "../../../function/teacher/funcQuiz";
import './teacher.css'
const HomePageTeacher = () => {
  // const [nextState, setNextState] = useState([]);
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState([]);
  const [courses, setCourses] = useState([]);
  const [file, setFile] = useState();
  const [dataquiz, setDataQuiz] = useState([]);
  const [value, setValue] = useState(
    {
      email: "",
      tel: ""
    }
  );

  const loadData = () => {
    getMyaccount(sessionStorage.getItem("token"))
      .then(res => {
        console.log(res.data)
        setData(res.data)
        setValue({
          email: res.data.email,
          tel: res.data.tel
        })
      })
      .catch(err => {
        console.log(err)
      })
  }
  const fetchMyCourse = () => {
    getmyCourseTeacher(sessionStorage.getItem("token"))
      .then((response) => {
        console.log("course : ", response.data)
        setCourses(response.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const loadQuiz = () => {
    listQuiz(
      sessionStorage.getItem("token")
    )
      .then(res => {
        console.log("quiz : ", res.data)
        setDataQuiz(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    loadData()
    fetchMyCourse()
    loadQuiz()
  }, [])

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  // const handlechange = (e) => {
  //   console.log(e.target.files[0])
  //   const formData = new FormData();
  //   formData.append('file', e.target.files[0])
  //   uploadProfile(
  //     sessionStorage.getItem("token"),
  //     formData
  //   ).then(res => {
  //     console.log(res)
  //     loadData()
  //   })
  //     .catch(err => {
  //       console.log(err)
  //     })

  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      updateProfile(sessionStorage.getItem("token"), value)
        .then(res => {
          console.log(res)
          loadData()
          setEdit(false)
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      const formData = new FormData();
      formData.append('file', file)
      formData.append('email', value.email)
      formData.append('tel', value.tel)
      uploadProfile(
        sessionStorage.getItem("token"),
        formData
      ).then(res => {
        console.log(res)
        loadData()
        setEdit(false)
      })
        .catch(err => {
          console.log(err)
        })
    }


  }

  return (
    <div>
      <NavTeacher />
      <div className='container mt-5'>
        <div className="row">
          <div className="col-md-4 mb-3">
            <div className="card mb-3">
              <div className="card-body p-4">
                <div>
                  <div className='d-flex justify-content-center mb-3 position-relative'>

                    <span className="position-absolute top-0 start-100 translate-middle p-2"
                      onClick={() => setEdit(true)}
                    >
                      {/* <span className="visually-hidden">New alerts</span> */}
                      <i className="bi bi-pencil-square text-secondary edit-icon"></i>
                    </span>
                    {edit
                      ? <>
                        {data.profile
                          ? <img src={`${process.env.REACT_APP_IMG}/${data.profile}`} className="rounded-circle Avatar-2 shadow" />
                          :
                          <div className="my-4">
                            <label className="form-label">Add profile picture</label>
                            <input type="file" className="form-control" onChange={(e) => setFile(e.target.files[0])} />
                            <p className='text-end mt-2' style={{ fontSize: "12px" }}>recommend size 360px * 360px</p>
                          </div>
                        }
                      </>
                      : <>
                        {data.profile
                          ? <img src={`${process.env.REACT_APP_IMG}/${data.profile}`} className="rounded Avatar-2" />
                          : <div className="bg-secondary-css p-2 rounded">
                            <div className="m-2 d-flex justify-content-center">
                              <i className="bi bi-person-circle Avatar d-flex text-white" ></i>
                            </div>
                            {/* <label className="form-label">เพิ่มรูปโปรไฟล์</label> */}
                            {/* <input type="file" className="form-control" onChange={handlechange} /> */}
                          </div>
                        }
                      </>
                    }


                  </div>
                  {/* <h5 className="mb-2 text-center"><strong>{data.firstname}</strong></h5> */}
                  {/* <p className="text-muted text-center">Web designer <span className="badge bg-primary">PRO</span></p> */}
                </div>
                <hr className='my-4' />
                {!edit
                  ? <div className="">
                    <div className="mb-3 row">
                      <label className="col-sm-3 col-form-label">Name</label>
                      <div className="col-sm-9">
                        <input type="text" readOnly className="form-control-plaintext" value={`${data.firstname} ${data.lastname}`} />
                      </div>
                    </div>
                    <div className="mb-3 row">
                      <label className="col-sm-3 col-form-label">Email</label>
                      <div className="col-sm-9">
                        {!!data.email
                          ? <input type="text" readOnly className="form-control-plaintext" value={`${data.email}`} />
                          : <input type="text" readOnly className="form-control-plaintext" value="No data" />
                        }

                      </div>
                    </div>
                    <div className="mb-3 row">
                      <label className="col-sm-3 col-form-label">Tel</label>
                      <div className="col-sm-9">
                        {/* <input type="text" readOnly className="form-control-plaintext" value={`${data.tel}`} /> */}
                        {!!data.tel
                          ? <input type="text" readOnly className="form-control-plaintext" value={`${data.tel}`} />
                          : <input type="text" readOnly className="form-control-plaintext" value="No data" />
                        }
                      </div>
                    </div>
                  </div>
                  : <form onSubmit={handleSubmit}>
                    <div className="mb-3 row">
                      <label className="col-sm-3 col-form-label">Name</label>
                      <div className="col-sm-9">
                        <input type="text" readOnly className="form-control-plaintext" value={`${data.firstname} ${data.lastname}`} />
                      </div>
                    </div>
                    <div className="mb-3 row">
                      <label className="col-sm-3 col-form-label">Email</label>
                      <div className="col-sm-9">
                        <input type="email" className="form-control" name='email' defaultValue={data.email} onChange={handleChange} />
                      </div>
                    </div>
                    <div className="mb-4 row">
                      <label className="col-sm-3 col-form-label">Tel</label>
                      <div className="col-sm-9">
                        <input type="text" className="form-control" name='tel' defaultValue={data.tel} onChange={handleChange} />
                      </div>
                    </div>
                    <div className="d-grid">
                      <button className="btn btn-warning text-white" type='submit'> Save </button>
                    </div>
                  </form>
                }

              </div>
            </div>

          </div>
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-6">
                <div className="card">
                  <div className="card-body p-5">
                    <div>
                      <p> Overview </p>
                      <hr />
                      <div className="my-3">
                        <label className="form-label"> Course </label>
                        <div className="mb-3 row">
                          <label className="col-sm-5 col-form-label">Amount</label>
                          <div className="col-sm-7">
                            <input type="text" readOnly className="form-control-plaintext" value={`${courses.length} courses`} />
                          </div>
                        </div>
                      </div>
                      <hr />
                      <div className="my-3">
                        <label className="form-label">Quiz</label>
                        <div className="mb-3 row">
                          <label className="col-sm-5 col-form-label"> Amount </label>
                          <div className="col-sm-7">
                            <input type="text" readOnly className="form-control-plaintext" value={`${dataquiz.length} quizzes`} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6"></div>
            </div>

          </div>
        </div>
      </div>

    </div>
  )
}

export default HomePageTeacher