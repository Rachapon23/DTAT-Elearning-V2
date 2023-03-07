import React from "react";
import { Table } from "antd";
import { listRoom } from "../../../../function/teacher/funcMiscellaneous";
import { createRoom , removeRoom} from "../../../../function/admin/funcFromAdmin";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import './HomeAdmin.css'
const Room = () => {
  const [room, setRoom] = useState([]);
  const [value, setValue] = useState({
    room: "",
    floor: "",
  });
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
  const loadRoom = () => {
    listRoom(sessionStorage.getItem("token"))
      .then((res) => {
        console.log(res.data);
        setRoom(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadRoom();
  }, []);

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const addRoom = (e) => {
    e.preventDefault();
    createRoom(sessionStorage.getItem("token"), value)
      .then((res) => {
        console.log(res.data);
        //   setRoom(res.data);
        loadRoom();
        Toast.fire({
          icon: 'success',
          title: 'Your room created successfully'
      })
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const columns = [
    {
      title: "No",
      align: "center",
      dataIndex: "_id",
      render: (_, dataObj) => {
        return room.indexOf(dataObj) + 1;
      },
    },
    {
      title: `Room`,
      align: "center",
      dataIndex: "room",
    },
    {
      title: `Floor`,
      align: "center",
      dataIndex: "floor",
    },
    {
      title: "Delete",
      align: "center",
      dataIndex: "delete",
      render: (_, item) => (
        <i
          className="bi bi-trash text-danger"
          onClick={() => handleRemoveRoom(item._id)}
          id="bin"
        ></i>
      ),
    },
  ];
  const handleRemoveRoom = (id) => {
    removeRoom(sessionStorage.getItem("token"), id)
    .then((res) => {
      console.log(res);
      //   setRoom(res.data);
      loadRoom();
      Toast.fire({
        icon: 'success',
        title: 'Your room has been deleted successfully'
    })
    })
    .catch((err) => {
      console.log(err);
    });
};
 

  return (
    <div className="mt-3 mb-5">
      <div className="card">
        <label className="form-label mt-3 ms-4">manage room</label>
        <div className="card-body">
          <div className="px-5">
            <div className="form-group mt-3">
              <label className="form-label">add room</label>
              <form onSubmit={addRoom}>
                <div className="input-group">
                  <input
                    type="text"
                    name="room"
                    className="form-control"
                    placeholder="room"
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="floor"
                    className="form-control"
                    placeholder="floor"
                    onChange={handleChange}
                  />
                  <button type="submit" className="btn btn-outline-primary">
                    {" "}
                    Add{" "}
                  </button>
                </div>
              </form>
            </div>
            <div className="form-group mt-3">
              <label className="form-label">list room</label>
              <Table
                columns={columns}
                dataSource={room}
                // rowKey={room._id}
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

export default Room;
