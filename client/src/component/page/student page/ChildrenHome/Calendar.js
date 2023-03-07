import React from 'react'

import { useState, useEffect } from 'react'
import { listCalendar } from '../../../../function/student/funcCalendar'

import { Button, Modal } from 'antd';

import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import timeGridPlugin from '@fullcalendar/timegrid'

import bootstrap5Plugin from '@fullcalendar/bootstrap5';

import '../student.css'

const Calendar = () => {
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const [nextState, setNextState] = useState([]);

    const [idCalen, setIdCarlen] = useState("")


    const showModal = () => {
        setIsModalOpen(true);
        // console.log("ID : ",idCalen)
    };

    const handleOk = () => {
        setIsModalOpen(false);

    };

    const handleCancel = () => {
        setIsModalOpen(false);
        // console.log("close")
        window.location.reload(false);
    };

    const showModal2 = () => {
        setIsModalOpen2(true);
        console.log("ID : ", idCalen)
    };

    const handleOk2 = () => {
        setIsModalOpen2(false);
    };

    const handleCancel2 = () => {
        setIsModalOpen2(false);
    };

    useEffect(() => {
        loadData()
    }, [])

    const loadData = () => {
        listCalendar(sessionStorage.getItem("token"))
            .then(res => {
                console.log(res.data)
                setEvents(res.data)
            }).catch(err => {
                console.log(err)
            })
    }

    const handdleClick = (info) => {
        const id = info.event._def.extendedProps._id
        setIdCarlen(id)
        setNextState([...nextState])
        showModal2()
    }

    return (
        <div className=''>
            <FullCalendar
                plugins={[dayGridPlugin, bootstrap5Plugin]}
                // initialView="dayGridMonth"
                headerToolbar={{
                    left: '',
                    center: 'title',
                    right: ""
                }}
                height={500}
                themeSystem='bootstrap5'
                events={events}
                eventClick={handdleClick}
            />
            {/* <div className="d-flex justify-content-end">
                <button className='btn my-2 zoom-calendar' onClick={showModal}
                > Zoom <i className="bi bi-zoom-in"></i></button>
            </div> */}
            {/* <Modal open={isModalOpen} width={1000} onOk={handleOk} onCancel={handleCancel}

                footer={[

                ]}
            >
                <FullCalendar
                    plugins={[dayGridPlugin, bootstrap5Plugin]}
                    headerToolbar={{
                        left: '',
                        center: 'title',
                        right: ""
                    }}
                    height={700}
                    events={events}
                    themeSystem='bootstrap5'
                    eventClick={handdleClick}
                />
            </Modal> */}




            <Modal title="Class Room" open={isModalOpen2} width={500} onOk={handleOk2} onCancel={handleCancel2}
                centered
                footer={[

                ]}
            >
                <div className="">
                    {events.map((item, index) =>
                        <div key={index}>
                            {item._id == idCalen
                                ? <div>
                                    <p>Course : {item.coursee.name}</p>
                                    <p>Room : {item.coursee.room.room}</p>
                                    <p>Floor : {item.coursee.room.floor}</p>
                                </div>
                                : <></>
                            }
                        </div>
                    )}
                </div>
            </Modal>



        </div>
    )
}

export default Calendar