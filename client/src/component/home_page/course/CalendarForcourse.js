import React from "react";

import { useState, useEffect } from "react";
import { getCalendar } from '../../../function/student/funcCalendar'


import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import timeGridPlugin from "@fullcalendar/timegrid";
// import { Modal } from "antd";

import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";

import bootstrap5Plugin from "@fullcalendar/bootstrap5";

const Calendar = ({ id }) => {
  const [courses, setCourses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [color, setColor] = useColor("hex", "#0288D1");



 
  useEffect(() => {
    loadData();
  }, []);
  const loadData = () => {
    getCalendar(sessionStorage.getItem("token"),id)
      .then((res) => {
        setEvents(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  return (
    <div className="card mt-3">
        <div className="card-body">
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

          />
        </div>
    </div>
  );
};

export default Calendar;
