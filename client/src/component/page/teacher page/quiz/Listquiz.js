import React from 'react'
import NavTeacher from '../../../layout/NavTeacher'
import { useState, useEffect } from 'react'
import { listQuiz,removeQuiz } from "../../../../function/teacher/funcQuiz";
import { useNavigate } from 'react-router-dom'
import Swal from "sweetalert2";
import {Table} from "antd";

const Listquiz = () => {
  
  const [dataquiz, setDataQuiz] = useState([]);
  const navigate = useNavigate()

  const loadQuiz = () => {
    listQuiz(
      sessionStorage.getItem("token")
    )
      .then(res => {
        // console.log(res.data)
        setDataQuiz(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const createQuiz = () => {
    navigate('/teacher/quiz')
  }

  useEffect(() => {
    loadQuiz()
  }, [])
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
  const handleRemoveQuiz = (id) =>{
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      //   cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
      if (result.isConfirmed) {
        removeQuiz(sessionStorage.getItem("token"), id)
        .then(res => {
            console.log(res)
            Toast.fire({
              icon: 'success',
              title: 'Your Quiz has been deleted successfully'
          })
            loadQuiz()
          }).catch(err => {
            console.log(err)
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
              footer: '<a href="">Why do I have this issue?</a>'
            })
          })
        }
      })
  }

  const handleEditQuiz = (id) =>{
    navigate('/teacher/edit-quiz/'+id)
  }

  const columns = [
    {
      title: 'No',
      align: 'center',
      dataIndex: '_id',
      render: (_, dataObj) => {
        return dataquiz.indexOf(dataObj) + 1
      }
    },
    {
      title: "Quiz Name",
      align: 'center',
      dataIndex: 'name',
    },
    {
      title: "Number of Questions",
      align: 'center',
      dataIndex: 'noq',
      render: (_, dataObj) => {
        return dataObj.question.length
      }
    },
    {
      title: "Attemp",
      align: 'center',
      dataIndex: 'attemp',
    },
    {
      title: "Edit",
      align: 'center',
      dataIndex: 'edit',
      render: (_, item) => (
        <div>
          <i className="bi bi-pencil-square text-warning" onClick={()=>handleEditQuiz(item._id)}></i>
        </div>
      ),
    },
    {
      title: "Delete",
      align: 'center',
      dataIndex: 'delete',
      render: (_, item) => (
        <i className="bi bi-trash text-danger" onClick={()=>handleRemoveQuiz(item._id)}></i>
      ),
    },
  ];

  return (
    <div>
      <NavTeacher />
      <div className="container">
      {/* <div className="row p-2">
                    <div className="d-flex justify-content-end mt-4 bg-addcouse p-3  shadow-sm">
                        <button type='button' className='btn btn-outline-success' onClick={createQuiz}
                        >Add Quiz &nbsp;<i className="bi bi-folder-plus"></i>
                        </button>
                    </div>
                </div> */}
        <div className="row p-2 ">
          <div className="card">
            <div className="card-body">
              <Table columns={columns} dataSource={dataquiz} key={1}></Table>
              {/* <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">ลำดับ</th>
                    <th scope="col">ชื่อแบบทดสอบ</th>
                    <th scope="col">จำนวนข้อ</th>
                    <th scope="col">แก้ไข</th>
                    <th scope="col">ลบ</th>
                  </tr>
                </thead>
                <tbody>
                  {dataquiz.map((item, index) =>
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{item.name}</td>
                      <td>{item.question.length}</td>
                      <td><i onClick={()=>handleEditQuiz(item._id)}
                       className="bi bi-pencil-square text-warning"></i></td>
                      <td><i onClick={()=>handleRemoveQuiz(item._id)}
                      className="bi bi-trash text-danger"></i></td>
                    </tr>
                  )}


                </tbody> 
              </table>*/}
            </div>
          </div>
        </div>
        {/* <div className="d-grid mt-3">
          <button onClick={createQuiz} className="btn btn-success">สร้างแบบทดสอบ</button>
        </div> */}
      </div>
    </div>
  )
}

export default Listquiz