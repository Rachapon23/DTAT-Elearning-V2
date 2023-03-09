import React from "react";
import NavTeacher from "../../../layout/NavTeacher";
import { useState, useEffect } from "react";
import "./calendar.css";
import {
  createCalendar,
  listCalendar,
  removeEvent,
  updateEvent,
} from "../../../../function/teacher/funcCalendar";
import { getmyCourseTeacher } from "../../../../function/teacher/funcCourse";
import moment from "moment";
import Swal from "sweetalert2";

import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import timeGridPlugin from "@fullcalendar/timegrid";
import { Modal } from "antd";

import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";

import bootstrap5Plugin from "@fullcalendar/bootstrap5";

const Calendar = ({ course, setNextState, nextState,setCourse }) => {
  const [courses, setCourses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [color, setColor] = useColor("hex", "#0288D1");

  const [json, setJson] = useState("");
  const [values, setValues] = useState({
    // title: '',
    start: "",
    end: "",
    color: "#0288D1",
    // coursee: ""
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    // if (nameCourse.calendar.length > 0) {
    //   nameCourse.calendar[0] = values;
    //   setNextState([...nextState]);
    //   setIsModalOpen(false);
    // } else {
    //   nameCourse.calendar.push(values);
    //   setNextState([...nextState]);
      setIsModalOpen(false);
    // }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onChangeValues = (e) => {
    // console.log(e)
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onChangeColor = (e) => {
    // setValues({ ...values, color: e.hex });
    course.calendar[0].color = e.hex
    setColor(e);
    setNextState([...nextState]);
  };

  // const handleSelect = (info) => {
  //   // console.log(values)
  //   showModal();
  //   setValues({
  //     ...values,
  //     start: info.startStr,
  //     end: info.endStr,
  //   });
  // };

  const handleChange = (info) => {
      // const values = {
      //     id: info.event._def.extendedProps._id,
      //     start: info.event.startStr,
      //     end: info.event.endStr
      // }
      course.calendar[0].start = info.event.startStr
      course.calendar[0].end = info.event.endStr
      setNextState([...nextState]);
      // console.log(course.calendar)

      // updateEvent(sessionStorage.getItem("token"), values)
      //     .then(res => {
      //         console.log(res)
      //         Toast.fire({
      //             icon: 'success',
      //             title: 'Your time table updated'
      //         })
      //     }).catch(err => {
      //         console.log(err)
      //     })
  }

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

  const handleClick = (info) => {
      // const id = info.event._def.extendedProps._id
     
      // Swal.fire({
      //     title: 'Are you sure?',
      //     text: "You won't be able to revert this!",
      //     icon: 'warning',
      //     showCancelButton: true,
      //     confirmButtonColor: '#d33',
      //     // cancelButtonColor: '#3085d6',
      //     confirmButtonText: 'Yes, delete it!'
      // }).then((result) => {
      //     if (result.isConfirmed) {
      //         removeEvent(sessionStorage.getItem("token"), id)
      //             .then(res => {
      //                 console.log(res)
      //                 Toast.fire({
      //                     icon: 'success',
      //                     title: 'Your time table has been deleted successfully'
      //                 })
      //                 loadData()
      //             }).catch(err => {
      //                 if (err.response.data == "you have no rights") {
      //                     Swal.fire({
      //                         icon: 'error',
      //                         title: 'Error',
      //                         text: 'You cannot delete other time table',
      //                     })
      //                 } else {
      //                     console.log(err)
      //                 }

      //             })
      //     }
      // })
      showModal();

  }

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    listCalendar(sessionStorage.getItem("token"))
      .then((res) => {
        // console.log(res.data)
        setEvents(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const fetchMyCourse = () => {
  //     getmyCourseTeacher(sessionStorage.getItem("token"),
  //         sessionStorage.getItem("user_id"))
  //         .then((response) => {
  //             // console.log(response)
  //             setCourses(response.data)
  //         })
  //         .catch((err) => {
  //             console.log(err)

  //         })
  // }
  // useEffect(() => {
  //     fetchMyCourse()
  // }, [])

  // const handleSelector = (e) => {
  //   const course = JSON.parse(e.target.value);
  //   setValues({ ...values, title: course.name, coursee: course._id });
  //   setJson(e.target.value);
  // };

  return (
    <div>
      <div className="mt-4">
        <div className="bg-primary head-form"></div>
        <div className="card-body p-5 ">
          <FullCalendar
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              bootstrap5Plugin,
            ]}
            headerToolbar={{
              left: "prev today",
              center: "title",
              right: "next",
            }}
            height={500}
            themeSystem="bootstrap5"
            events={events}
            // selectable={true}
            // select={handleSelect}
            eventClick={handleClick}
            editable={true}
            eventChange={handleChange}
          />
        </div>
      </div>

      <Modal
        title="Theme"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="mb-5 mt-4">
          {/* <div className="form-group mb-3">
                        <label className='form-label'> Select Course </label>
                        <select className="form-select"
                            id="selector" value={json}
                            onChange={handleSelector}>
                            <option value="">select course...</option>
                            {courses.map((item, index) =>
                                <option key={index} value={JSON.stringify(item)}>{item.name}</option>
                            )}
                        </select>
                    </div> */}
          <div className="form-group">
            {/* <label className='form-label'>Theme</label> */}
            <div className="d-flex justify-content-center">
              <ColorPicker
                width={456}
                height={228}
                color={color}
                onChange={onChangeColor}
                hideHSV
                dark
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Calendar;
