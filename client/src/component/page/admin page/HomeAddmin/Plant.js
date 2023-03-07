import React from "react";
import { Table } from "antd";

import {
  createPlant,
  removePlant,
  
} from "../../../../function/admin/funcFromAdmin";
import { listPlant } from "../../../../function/teacher/funcMiscellaneous";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "./HomeAdmin.css";

const Plant = () => {
  const [plant, setPlant] = useState([]);
  const [value, setValue] = useState({
    plantname: "",
  });
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const addPlant = (e) => {
    e.preventDefault();
    createPlant(sessionStorage.getItem("token"), value)
      .then((res) => {
        console.log(res.data);
        //   setRoom(res.data);
        loadPlant();
       
        Toast.fire({
          icon: "success",
          title: "Your room created successfully",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const loadPlant = () => {
    listPlant(sessionStorage.getItem("token"))
      .then((res) => {
        console.log(res.data);
        setPlant(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    loadPlant();
  }, []);

  const columns = [
    {
      title: "No",
      align: "center",
      dataIndex: "_id",
      render: (_, dataObj) => {
        return plant.indexOf(dataObj) + 1;
      },
    },
    {
      title: `Plant`,
      align: "center",
      dataIndex: "plantname",
    },

    {
      title: "Delete",
      align: "center",
      dataIndex: "delete",
      render: (_, item) => (
        <i
          className="bi bi-trash text-danger"
          onClick={() => handleRemovePlant(item._id)}
          id="bin"
        ></i>
      ),
    },
  ];
  const handleRemovePlant = (id) => {
    removePlant(sessionStorage.getItem("token"), id)
      .then((res) => {
        console.log(res);
        //   setRoom(res.data);
        loadPlant();
        Toast.fire({
          icon: "success",
          title: "Your room has been deleted successfully",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="mt-3">
      <div className="card">
        <label className="form-label mt-3 ms-4">manage plant</label>
        <div className="card-body">
          <div className="px-5">
            <div className="form-group mt-3">
              <label className="form-label">add plant</label>
              <form onSubmit={addPlant}>
                <div className="input-group">
                  <input
                    type="text"
                    name="plantname"
                    onChange={handleChange}
                    className="form-control"
                  />
                  <button type="submit" className="btn btn-outline-primary">
                    {" "}
                    Add{" "}
                  </button>
                </div>
              </form>
            </div>
            <div className="form-group mt-3">
              <label className="form-label">list plant</label>
              <Table
                columns={columns}
                dataSource={plant}
                // rowKey={plant._id}
                pagination={{
                  defaultPageSize: 20,
                  showSizeChanger: true,
                  pageSizeOptions: ["10", "20", "30"],
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plant;
