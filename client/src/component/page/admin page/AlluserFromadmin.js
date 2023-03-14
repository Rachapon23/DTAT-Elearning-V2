import React from 'react'
import NavAdmin from '../../layout/NavAdmin'
import { listAlluser } from '../../../function/admin/funcFromAdmin'
import { useState, useEffect } from "react";
import { Table } from "antd";


const AlluserFromadmin = () => {

  const [data, setData] = useState([])


  useEffect(() => {
    loadData()

  }, [])

  const loadData = () => {

    listAlluser(sessionStorage.getItem("token"))
      .then(res => {
        setData(res.data)
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
      render: (role) => {
        if(role === "admin") {
          return <div className='text-danger'>{role}</div>
        }
        else if(role === "teacher") {
          return <div className='text-primary'>{role}</div>
        }
        else if(role === "student") {
          return <div className='text-success'>{role}</div>
        }
      }
    },
];

  return (
    <div>
      <NavAdmin />
<div className='container'>
    <div className='mt-5'>
      <Table 
        columns={columns} 
        dataSource={data} 
        pagination={{
          defaultPageSize: 20,
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '30'],
        }}
        rowKey="_id"
      />
    {/* <table className="table">
        <thead>
          <tr>
            <th scope="col">ลำดับ</th>
            <th scope="col">รหัสพรักงาน</th>
            <th scope="col">รหัส</th>
            <th scope="col">ชื่อ</th>
            <th scope="col">นามกสุล</th>
            <th scope="col">สิทธิ์</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item,index)=>
      <tr key={index}>
      <th scope="row">{index}</th>
      <td>{item.employee_ID}</td>
      <td>{item.department_ID}</td>
      <td>{item.firstname}</td>
      <td>{item.lastname}</td>
      {item.role == "admin" && (<td className='text-danger'>{item.role}</td>)}
      {item.role == "teacher" && (<td className='text-primary'>{item.role}</td>)}
      {item.role == "student" && (<td className='text-success'>{item.role}</td>)}
      
   
    </tr>

    )}

        </tbody>
      </table> */}
    </div>
</div>


    </div>
  )
}

export default AlluserFromadmin