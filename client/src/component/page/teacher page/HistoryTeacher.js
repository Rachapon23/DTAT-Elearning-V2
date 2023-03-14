import React from 'react'
import NavTeacher from '../../layout/NavTeacher'
import { getMyHistoryTeacher,removeHistory } from '../../../function/teacher/funcCourse';
import { useState, useEffect } from 'react'
import { Table } from "antd";
import Swal from "sweetalert2";

const HistoryTeacher = () => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        loadData()
      }, [])


      const clearHistory = () =>{
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
                removeHistory(sessionStorage.getItem("token"))
                .then(res => {
                  console.log(res.data)
                  loadData()
                })
                .catch(err => {
                  console.log(err)
                })
            }
        })
      }

    const loadData = () => {
        getMyHistoryTeacher(sessionStorage.getItem("token"))
          .then(res => {
            setHistory(res.data)
            console.log(res.data)
          })
          .catch(err => {
            console.log(err)
          })
      }
      const columns = [
        {
          title: "No",
          align: "center",
          dataIndex: "_id",
          render: (_, dataObj) => {
            return history.indexOf(dataObj) + 1;
          },
        },
        {
          title: `employee ID`,
          align: "center",
          dataIndex: "",
          render: (_, dataObj) => {
            return (dataObj.student.employee_ID)
          },
        },
        {
          title: `name`,
          align: "center",
          dataIndex: "",
          render: (_, dataObj) => {
            return (dataObj.student.firstname)
          },
        },
        {
          title: `course`,
          align: "center",
          dataIndex: "course",
        },
    
        {
          title: `score`,
          align: "center",
          dataIndex: "score",
        },
    
        {
          title: `max score`,
          align: "center",
          dataIndex: "maxscore",
        },
    
        {
          title: `result`,
          align: "center",
          dataIndex: "result",
        },
    
       
      ];
  return (
    <div>
           <NavTeacher />
           <div className="container mt-5">
            <div className="d-flex justify-content-end">
                <p>จำนวนทั้งหมด : {history.length} คน</p>
            </div>
           <Table
                columns={columns}
                dataSource={history}
               
                pagination={{
                  defaultPageSize: 20,
                  showSizeChanger: true,
                  pageSizeOptions: ["10", "20", "30"],
                }}
              />
              {history.length > 0 && 
              <div className="d-flex justify-content-start mt-3">
                <div className="d-grid">
                    <button className="btn btn-warning"
                    onClick={clearHistory}
                    >clear value</button>
                </div>
            </div>
                }
           </div>
    </div>
  )
}

export default HistoryTeacher