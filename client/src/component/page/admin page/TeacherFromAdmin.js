import React from 'react'
import NavAdmin from '../../layout/NavAdmin'
import { listTeacheruser, changeRole } from '../../../function/funcFromAdmin'
import { useState, useEffect } from "react";
import { changeEnable } from '../../../function/funcFromAdmin';
import { Table } from 'antd';
import Swal from "sweetalert2";

const TeacherFromAdmin = () => {
    const [data, setData] = useState([])


    useEffect(() => {
        loadData()

    }, [])

    const loadData = () => {

        listTeacheruser(sessionStorage.getItem("token"))
            .then(res => {

                setData(res.data)
            })
            .catch(err => {
                console.log(err)
            })


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
    // console.log(data)
    const handlechange = (e, id) => {
        // console.log(e.target.value,id)
        let value = {
            id: id,
            role: e.target.value
        }
        changeRole(sessionStorage.getItem("token"), value)
            .then(res => {
                console.log(res)
                loadData()
                Toast.fire({
                    icon: 'success',
                    title: 'change Role successfully'
                })
            })
            .catch(err => {
                console.log(err)
            })
        // console.log(value)
    }

    const handleChangeEanble = (e, id) => {

        let data = {
          id: id,
          enabled: e.target.checked !== true
        }
    
        changeEnable(sessionStorage.getItem("token"), data)
        .then(res => {
          loadData()
        })
        .catch(err => {
          console.log(err)
        })
    }

    const columns = [
        {
          title: 'No',
          align: 'center',
          dataIndex: '_id',
          render: (_, dataObj) => {
            return data.indexOf(dataObj) + 1
          }
        },
        {
          title: `Employee ID`,
          align: 'center',
          dataIndex: 'employee_ID',
        },
        {
          title: `Department ID`,
          align: 'center',
          dataIndex: 'department_ID',
        },
        {
          title: `First Name`,
          align: 'center',
          dataIndex: 'firstname',
        },
        {
          title: `Last Name`,
          align: 'center',
          dataIndex: 'lastname',
        },
        {
          title: `Authority`,
          align: 'center',
          dataIndex: 'role',
          render: (_, item) => {
            return (
                <select onChange={(e) => handlechange(e, item._id)}
                    className="form-select " >
                    <option selected>{item.role}</option>
                    <option value="student">student</option>
                </select>
            )
          }
        },
        {
            title: `Status`,
            align: 'center',
            dataIndex: 'enabled',
            render: (_, item) => {
                return (
                    <div className="form-check form-switch d-flex justify-content-center">
                        <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" checked={item.enabled} onChange={(e) => handleChangeEanble(e, item._id)}/>
                    </div>
                )
            }
        },
    ];

    return (
        <div>
            <NavAdmin />
            <div className='container'>
                <div className='mt-5' >
                    <Table 
                        columns={columns} 
                        dataSource={data}
                        pagination={{
                            defaultPageSize: 20,
                            showSizeChanger: true,
                            pageSizeOptions: ['10', '20', '30'],
                        }}
                    />
                    {/* <table className="table" >
                        <thead >
                            <tr >
                                <th scope="col" >ลำดับ</th>
                                <th scope="col">รหัสพรักงาน</th>
                                <th scope="col">รหัส</th>
                                <th scope="col">ชื่อ</th>
                                <th scope="col">นามกสุล</th>
                                <th scope="col">สิทธิ์</th>
                                <th scope="col">สถานะ</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) =>
                                <tr key={index}>
                                    <th scope="row" >{index}</th>
                                    <td>{item.employee_ID}</td>
                                    <td>{item.department_ID}</td>
                                    <td>{item.firstname}</td>
                                    <td>{item.lastname}</td>
 
                                    <td>
                                        <select onChange={(e) => handlechange(e, item._id)}
                                            className="form-select " >
                                            <option selected>{item.role}</option>
                                            <option value="student">Student</option>

                                        </select>
                                    </td>
                                    <td>
                                        <div className="form-check form-switch d-flex justify-content-center">
                                            <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" checked={item.enabled} onChange={(e) => handleChangeEanble(e, item._id)}/>
                                        </div>
                                    </td>



                                </tr>

                            )}

                        </tbody>
                    </table> */}
                </div>
            </div>


        </div>
    )
}

export default TeacherFromAdmin