import React from 'react'
import NavTeacher from '../../../layout/NavTeacher'
// import { listQuiz, } from "../../../../function/teacher/funcQuiz";
import { updateCourse, updateCourseVideoAmount } from '../../../../function/teacher/funcCourse';
import { useState, useEffect } from 'react'
import { Link, useLocation, useParams } from "react-router-dom";
import { getQuizByCourseID, removeQuiz } from "../../../../function/teacher/funcQuiz";
import { getCourse } from "../../../../function/teacher/funcCourse";
import { listRoom } from '../../../../function/teacher/funcMiscellaneous'
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom'
import { uploadImg, upDateImg, uploadfile, listPlant, } from '../../../../function/teacher/funcMiscellaneous'
import { Card } from 'antd';
import { Switch } from "antd";
import CalendarForEditcourse from "../calendar/CalendarForEditcourse";
import {
    updateEvent,
} from "../../../../function/teacher/funcCalendar";
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
const { Meta } = Card;
const EditCourse = () => {
    const [loading, setLoading] = useState(false)
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    const navigate = useNavigate()
    const [valuetopic, SetValueTopic] = useState([])
    const { id } = useParams();
    const [course, setCourse] = useState();
    const [topic, setTopic] = useState();
    const [dataquiz, setDataQuiz] = useState()
    const [nextState, setNextState] = useState([]);
    const [room, setRoom] = useState([]);
    const [file, setFile] = useState('');
    const [videoAmount, setVideoAmount] = useState(0);
    const location = useLocation();
    const [plant, setPlant] = useState([{ plantname: "...select" }]);

    const errorTopic = {
        title: "Please enter title of topic",
        description: "Please enter description of topic",
        text: "Please enter sub-content of topic",
        link_name: "Please enter name of link",
        link_url: "Please enter URL of link",
        quiz: "Please select quiz of topic",
    }

    const [error, setError] = useState({
        name: "",
        description: "",
        course_number: "",
        room: "",
    })

    // const [nameCourse, setNameCourse] = useState
    // ({
    //     name: "",
    //     description: "",
    //     course_number: "",
    //     password: "",
    //     teacher: sessionStorage.getItem('user_id')
    // })

    const submitRemoveQuiz = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            //   cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        })
            .then((result) => {
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

    const fetchCourse = () => {
        getCourse(sessionStorage.getItem("token"), id)
            .then((response) => {
                console.log(response)
                setCourse(response.data)
                setTopic(response.data.topic)
                SetValueTopic(response.data.topic)
            })
            .catch((err) => {
                console.log(err)
                Swal.fire(
                    "Alert!",
                    "Cannot fetch course data",
                    "error"
                )
            })
    }
    const loadPlant = () => {
        listPlant(sessionStorage.getItem("token"))
            .then((res) => {
                console.log(res.data);
                setPlant([...plant, ...res.data]);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const loadQuiz = () => {
        getQuizByCourseID(
            sessionStorage.getItem("token"),
            id
        )
            .then(res => {
                console.log(res.data)
                setDataQuiz(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        loadQuiz()
        loadRoom()
        loadPlant();
    }, [])

    const handleAddTopic = () => {
        SetValueTopic([...valuetopic,
        {
            title: "",
            description: "",
            text: [],
            link: [],
            quiz: [],
            file: [],
        }
        ])
    }
    const handleRemoveTopic = (index) => {
        valuetopic.splice(index, 1)
        setNextState([...nextState])
    }
    const handleRemoveStudent = (e, tdex) => {
        e.preventDefault();
        course.member.splice(tdex, 1);
        setNextState([...nextState]);
    };
    const handAddName = (e) => {
        setCourse({ ...course, [e.target.name]: e.target.value });
        setError({ ...error, [e.target.name]: "" });
    }

    const handdleAddtext = (e, index) => {
        e.preventDefault();
        valuetopic[index].text.push(
            {
                type: "text",
                content: "",
            }
        )
        setNextState([...nextState])
    }
    const handdleAddlink = (e, index) => {
        e.preventDefault();
        valuetopic[index].link.push(
            {
                type: "link",
                name: "",
                url: '',
            }
        )
        setNextState([...nextState])
    }
    const handdleAddStudent = (e, index) => {
        e.preventDefault();
        console.log(e)
        course.member.push({
            plant: "",
            amount: 0,
            registerd: 0,
        });
        setNextState([...nextState]);
    };

    const handdleAddquiz = (e, index) => {
        e.preventDefault();
        valuetopic[index].quiz.push(
            {
                type: "quiz",
                name: "",
                quiz: ''
            }
        )
        setNextState([...nextState])
    }
    const handdleAddfile = (e, index) => {
        e.preventDefault();
        valuetopic[index].file.push(
            {
                type: "file",
                name: "",
                file: '',
                filetype: ""
            }
        )
        setNextState([...nextState])
    }


    const handleRemoveText = (e, index, tdex) => {
        e.preventDefault();
        valuetopic[index].text.splice(tdex, 1)
        setNextState([...nextState])
    }
    const handleRemoveLink = (e, index, tdex) => {
        e.preventDefault();
        valuetopic[index].link.splice(tdex, 1)
        setNextState([...nextState])
    }
    const handleRemoveQuiz = (e, index, tdex) => {
        e.preventDefault();
        valuetopic[index].quiz.splice(tdex, 1)
        setNextState([...nextState])
    }
    const handleRemovefile = (e, index, tdex) => {
        e.preventDefault();
        console.log(valuetopic[index].file)
        valuetopic[index].file.splice(tdex, 1)
        setNextState([...nextState])
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

    // const handleRemovecalendar = (e, tdex) => {
    //     e.preventDefault();
    //     course.calendar.splice(tdex, 1);
    //     setNextState([...nextState]);
    //   };

    const hadleAddNewQuiz = () => {
        Swal.fire({
            icon: 'warning',
            title: 'Warning',
            text: 'Are you sure to leave this page your unsave data will be lost',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sure'
        }).then((result) => {
            if (result.isConfirmed) {
                navigate("/teacher/quiz")
            }
        })
    }

    useEffect(() => {
        fetchCourse()
    }, []);


    const handdleSubmit = async (e) => {
        e.preventDefault();

        let valid = true;

        if (!!!course.name) {
            setError({ name: "Please enter name of course" })
            valid = false;
            document.getElementById("name_course").focus({ focusVisible: true });
            setLoading(false)
        }
        if (!!!course.description) {
            setError({ description: "Please enter name of course id" })
            valid = false;
            document.getElementById("description").focus({ focusVisible: true });
            setLoading(false)
        }
        if (course.statuscourse && !!!course.room) {
            setError({ room: "Please select room" })
            valid = false;
            document.getElementById("room").focus({ focusVisible: true });
        }
        if (course.statuscourse) {
            // console.log("-> ",course?.member)
            if(course?.member.length < 1) {
                valid = false;
                Toast.fire({
                    icon: 'error',
                    title: "Please select plant"
                })
            }
            for (let i = 0; i < course?.member.length; i++) {
                if (course?.member[i]?.plant === "") {
                    valid = false;
                    Toast.fire({
                        icon: 'error',
                        title: "Please select plant"
                    })
                }
            }
        }
        if (valuetopic.length > 0) {
            // console.log("for")
            for (let i = 0; i < valuetopic.length; i++) {
                // console.log("for 2")
                if (valuetopic[i].link.length > 0) {
                    for (let j = 0; j < valuetopic[i].link.length; j++) {
                        if (!!!valuetopic[i].link[j].name) {
                            // setErrorTopic({link_name: "Please enter name of link"})
                            document.getElementById(`linkname${i}${j}`).classList.add("is-invalid");
                            valid = false;
                            document.getElementById(`linkname${i}${j}`).focus({ focusVisible: true });
                            setLoading(false)
                        } else if (!!!valuetopic[i].link[j].url) {
                            // setErrorTopic({link_url: "Please enter URL of link"})
                            document.getElementById(`linkurl${i}${j}`).classList.add("is-invalid");
                            valid = false;
                            document.getElementById(`linkurl${i}${j}`).focus({ focusVisible: true });
                            setLoading(false)
                        }
                    }
                }
                if (valuetopic[i].text.length > 0) {
                    for (let j = 0; j < valuetopic[i].text.length; j++) {
                        if (!!!valuetopic[i].text[j].content) {
                            // setErrorTopic({text: "Please enter sub-content of topic"})
                            document.getElementById(`text${i}${j}`).classList.add("is-invalid");
                            valid = false;
                            document.getElementById(`text${i}${j}`).focus({ focusVisible: true });
                            setLoading(false)
                        }
                    }
                }
                // if (valuetopic[i].quiz.length > 0) {
                //     for (let j = 0; j < valuetopic[i].quiz.length; j++) {
                //         if (!!!valuetopic[i].quiz[j].quiz) {
                //             // setErrorTopic({quiz: "Please select quiz of topic"})
                //             document.getElementById(`quiz${i}${j}`).classList.add("is-invalid");
                //             valid = false;
                //             document.getElementById(`quiz${i}${j}`).focus({ focusVisible: true });
                //             setLoading(false)
                //         }
                //     }
                // }
            }
        }

        if (valid) {
            setLoading(true)
            await updateCourse(sessionStorage.getItem("token"),
                {
                    head: course,
                    body: valuetopic
                }
            ).then(async res => {

                console.log("res : ", res.data)
                if (course.statuscourse) {
                    const values = {
                        id: course._id,
                        color: course.calendar[0].color,
                        start: course.calendar[0].start,
                        end: course.calendar[0].end
                    }

                    await updateEvent(sessionStorage.getItem("token"), values)
                        .then(res => {
                            console.log(res)
                            //   Toast.fire({
                            //       icon: 'success',
                            //       title: 'Your time table updated'
                            //   })
                        }).catch(err => {
                            console.log(err)
                        })
                }


                if (!!file) {
                    const formData = new FormData();
                    formData.append('id', res.data.data._id)
                    formData.append('file', file)

                    if (!course.image) {
                        await uploadImg(sessionStorage.getItem("token"), formData)
                            .then(res => {
                                console.log(res)
                                // navigate('/teacher/get-course/' + id)
                            }).catch(err => {
                                console.log(err)
                            })
                    } else {
                        await upDateImg(sessionStorage.getItem("token"), formData)
                            .then(res => {
                                console.log(res)
                                // navigate('/teacher/get-course/' + id)
                            }).catch(err => {
                                console.log(err)
                            })
                    }

                    let video_amount = 0;
                    let recv_video_amount = res.data.video_amount
                    // console.log("change dec ->",course.video_amount, res.data.video_amount, course.video_amount - res.data.video_amount)

                    if (res.data.upload.length > 0) {
                        const array = res.data.upload
                        for (let i = 0; i < array.length; i++) {
                            // console.log(array[i].topic_number, array[i].file_number,valuetopic[array[i].topic_number].file[array[i].file_number].file )
                            const formDatafile = new FormData();
                            formDatafile.append('id', res.data.data._id)
                            formDatafile.append('topic_number', array[i].topic_number)
                            formDatafile.append('file_number', array[i].file_number)
                            formDatafile.append('file', valuetopic[array[i].topic_number].file[array[i].file_number].file)
                            if (valuetopic[array[i].topic_number].file[array[i].file_number].filetype === "video/mp4") video_amount++;

                            await uploadfile(sessionStorage.getItem("token"), formDatafile).then(res => {
                                console.log(res)
                                Toast.fire({
                                    icon: 'success',
                                    title: 'Your course updated'
                                })
                                navigate('/teacher/get-course/' + id)
                            }).catch(err => {
                                console.log(err)
                            })
                        }

                        await updateCourseVideoAmount(sessionStorage.getItem("token"), { id: res.data.data._id, data: { video_amount: video_amount } })
                            .then((res) => {
                                console.log(res);
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    }
                    else {
                        console.log("-->>> ", course.video_amount, recv_video_amount, recv_video_amount - course.video_amount)
                        await updateCourseVideoAmount(sessionStorage.getItem("token"), { id: res.data.data._id, data: { video_amount: recv_video_amount * -1 } })
                            .then((res) => {
                                console.log(res);
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                        Toast.fire({
                            icon: 'success',
                            title: 'Your course updated'
                        })
                        navigate('/teacher/get-course/' + id)
                    }
                }

                console.log("data uploads: ", res.data.upload)

                if (res.data.upload.length > 0) {
                    const array = res.data.upload
                    for (let i = 0; i < array.length; i++) {
                        // console.log(array[i].topic_number, array[i].file_number,valuetopic[array[i].topic_number].file[array[i].file_number].file )
                        const formDatafile = new FormData();
                        formDatafile.append('id', res.data.data._id)
                        formDatafile.append('topic_number', array[i].topic_number)
                        formDatafile.append('file_number', array[i].file_number)
                        formDatafile.append('file', valuetopic[array[i].topic_number].file[array[i].file_number].file)
                        await uploadfile(sessionStorage.getItem("token"), formDatafile).then(res => {
                            console.log(res)
                            Toast.fire({
                                icon: 'success',
                                title: 'Your course updated'
                            })
                            navigate('/teacher/get-course/' + id)
                        }).catch(err => {
                            console.log(err)
                        })
                    }
                } else {
                    Toast.fire({
                        icon: 'success',
                        title: 'Your course updated'
                    })
                    setLoading(false)
                    navigate('/teacher/get-course/' + id)
                }

            }).catch(err => {
                setLoading(false)
                console.log(err)
            })
        }

    }


    const loadRoom = () => {
        listRoom(sessionStorage.getItem("token"))
            .then(res => {
                // console.log(res.data)
                setRoom(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const deleteFornt = () => {
        delete course.image
        setNextState([...nextState])
    }
    const handleImg = (e) => {
        setFile(e.target.files[0])
    }

    const handleAddNewQuiz = async () => {
        await updateCourse(sessionStorage.getItem("token"),
            {
                head: course,
                body: valuetopic
            }
        ).then(async res => {
            console.log(res)
            if (!!file) {
                const formData = new FormData();
                formData.append('id', res.data.data._id)
                formData.append('file', file)

                if (!course.image) {
                    await uploadImg(sessionStorage.getItem("token"), formData)
                        .then(res => {
                            console.log(res)
                            // navigate('/teacher/get-course/' + id)
                        }).catch(err => {
                            console.log(err)
                        })
                } else {
                    await upDateImg(sessionStorage.getItem("token"), formData)
                        .then(res => {
                            console.log(res)
                            // navigate('/teacher/get-course/' + id)
                        }).catch(err => {
                            console.log(err)
                        })
                }


            }


            if (res.data.upload.length > 0) {
                const array = res.data.upload
                for (let i = 0; i < array.length; i++) {
                    // console.log(array[i].topic_number, array[i].file_number,valuetopic[array[i].topic_number].file[array[i].file_number].file )
                    const formDatafile = new FormData();
                    formDatafile.append('id', res.data.data._id)
                    formDatafile.append('topic_number', array[i].topic_number)
                    formDatafile.append('file_number', array[i].file_number)
                    formDatafile.append('file', valuetopic[array[i].topic_number].file[array[i].file_number].file)
                    await uploadfile(sessionStorage.getItem("token"), formDatafile).then(res => {
                        console.log(res)
                        Toast.fire({
                            icon: 'success',
                            title: 'Your course updated'
                        })
                        navigate('/teacher/get-course/' + id)
                    }).catch(err => {
                        console.log(err)
                    })
                }
            }
            else {
                Toast.fire({
                    icon: 'success',
                    title: 'Your course updated'
                })
                navigate('/teacher/quiz/' + id)
            }
        });
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
        // {
        //   title: "Edit",
        //   align: 'center',
        //   dataIndex: 'edit',
        //   render: (_, item) => (
        //     <div>
        //       <i className="bi bi-pencil-square text-warning" onClick={()=>handleEditQuiz(item._id)}></i>
        //     </div>
        //   ),
        // },
        // {
        //   title: "Delete",
        //   align: 'center',
        //   dataIndex: 'delete',
        //   render: (_, item) => (
        //     <i className="bi bi-trash text-danger" onClick={()=>handleRemoveQuiz(item._id)}></i>
        //   ),
        // },
    ];


    return (

        <div>
            <NavTeacher />
            {/* <h1>save ไม่มี topic จะ error, delete course ถ้าไม่มีไฟล์ที่หัวข้อจะ error</h1> */}
            <div className="container">
                <div className="mt-5">
                    {course &&
                        <form
                            onSubmit={handdleSubmit}
                        >
                            <div className="card">
                                <div className="bg-warning head-form"></div>
                                <div className="card-body p-5">
                                    <label className="form-label">Course Name</label>
                                    <input
                                        type="text"
                                        className={
                                            error.name && error.name.length !== 0 ? "form-control is-invalid" : "form-control"
                                        }
                                        name='name'
                                        id="name_course"
                                        onChange={handAddName}
                                        value={course.name}
                                    />
                                    <div className="invalid-feedback">
                                        {error.name}
                                    </div>



                                    <label className="form-label  mt-3">Detail</label>
                                    <textarea
                                        type="text"
                                        className={
                                            error.description && error.description.length !== 0 ? "form-control is-invalid" : "form-control"
                                        }
                                        name='description'
                                        id="description"
                                        onChange={handAddName}
                                        value={course.description}
                                    />
                                    <div className="invalid-feedback">
                                        {error.description}
                                    </div>
                                    <div className="row mt-3">

                                        {course.statuscourse
                                            ? <>
                                                <div className="row">
                                                    <div className="col-md-6">


                                                        <label className="form-label  mt-3">Room</label>
                                                        <div className="">
                                                            <select
                                                                name="room"
                                                                id="room"
                                                                className="form-control"
                                                                onChange={handAddName}>
                                                                {course.room && <option value="">{course.room.room}</option>}
                                                                {room.map((item, index) =>
                                                                    <option key={index} value={item._id}>{item.room}</option>
                                                                )}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="form-label  mt-3">
                                                            public or register
                                                        </label>
                                                        <div className="">
                                                            <Switch
                                                                defaultChecked={course.statuscourse}
                                                                disabled
                                                            // onChange={(e) => {
                                                            //     setCourse({ ...course, statuscourse: e });
                                                            // }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div></>
                                            : <>

                                            </>
                                        }

                                    </div>
                                    <div className="">
                                        <label className="form-label  mt-3">Cover Picture</label>
                                        {course.image
                                            ?
                                            <div>
                                                {file === '' &&
                                                    <div className="card">
                                                        <img src={`${process.env.REACT_APP_IMG}/${course.image}`} width="100%" className="card-img-top" />
                                                    </div>
                                                }
                                                <div className="d-flex justify-content-between py-2">
                                                    <button className="btn text-warning" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                                                        <i className="bi bi-pencil-square text-warning"></i> Update
                                                    </button>
                                                    {file === '' &&
                                                        <button className="btn text-danger" type="button" onClick={deleteFornt}>
                                                            <i className="bi bi-trash text-danger"></i> Delete
                                                        </button>
                                                    }
                                                </div>

                                                <div className="collapse" id="collapseExample">
                                                    <div className="mt-2">
                                                        <input type="file" className="form-control"
                                                            onChange={handleImg}
                                                        />
                                                        <p className='text-end mt-2' style={{ fontSize: "12px" }}>recommend size 820px * 312px</p>
                                                    </div>
                                                </div>
                                            </div>
                                            :
                                            <div>
                                                <div className="">
                                                    <input type="file" className="form-control"
                                                        onChange={handleImg}
                                                    />
                                                    <p className='text-end mt-2' style={{ fontSize: "12px" }}>recommend size 820px * 312px</p>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                    {course.statuscourse && (
                                        <>
                                            <>
                                                <div className="d-flex justify-content-between mb-0 mt-4">
                                                    <p className="">manage student</p>
                                                    <button
                                                        className="btn h4 text-primary mb-0"
                                                        type="Button"
                                                        onClick={(e) => handdleAddStudent(e)}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                                <hr className="mt-0" />

                                                <div className="mt-2">
                                                    <ul>
                                                        {course.member.map((ttem, tdex) => (
                                                            <li key={tdex} className="mt-3">
                                                                <div className="input-group ">
                                                                    <select
                                                                        name=""
                                                                        id=""
                                                                        className="form-select"
                                                                        defaultValue={course.member[tdex].plant}
                                                                        onChange={(e) => {
                                                                            ttem.plant = e.target.value;
                                                                            SetValueTopic([...valuetopic]);
                                                                        }}
                                                                    >
                                                                        {plant.map((ptem, pdex) => (
                                                                            <option key={pdex} value={ptem.plantname}>
                                                                                {ptem.plantname}
                                                                            </option>
                                                                        ))}
                                                                    </select>
                                                                    <input
                                                                        type="number"
                                                                        className="form-control mx-2"
                                                                        defaultValue={course.member[tdex].amount}
                                                                        onChange={(e) => {
                                                                            ttem.amount = e.target.value;
                                                                            SetValueTopic([...valuetopic]);
                                                                        }}
                                                                    />
                                                                    <button
                                                                        className="btn btn-outline-secondary"
                                                                        onClick={(e) => handleRemoveStudent(e, tdex)}
                                                                        type="Button"
                                                                    >
                                                                        <i className="bi bi-trash"></i>
                                                                    </button>
                                                                    <div className="invalid-feedback">
                                                                        {errorTopic.text}
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </>

                                            <div className="mt-5">
                                                <p>calendar</p>
                                                <CalendarForEditcourse
                                                    course={course}
                                                    setCourse={setCourse}
                                                    setNextState={setNextState}
                                                    nextState={nextState}
                                                />

                                                {course.calendar.map((ttem, tdex) => (
                                                    <div key={tdex} className="mt-3">

                                                        <div className="d-flex justify-content-between">
                                                            <p>start : {ttem.start}</p>
                                                            <p>end : {ttem.end}</p>
                                                            <div className="d-flex">
                                                                <p style={{ color: `${ttem.color}` }}>color : </p>
                                                                <div
                                                                    className="ms-2"
                                                                    style={{
                                                                        height: "20px",
                                                                        width: "20px",
                                                                        backgroundColor: `${ttem.color}`,
                                                                    }}
                                                                ></div>
                                                            </div>
                                                            {/* <button
                              className="btn btn-outline-secondary"
                              onClick={(e) => handleRemovecalendar(e, tdex)}
                              type="Button"
                            >
                              <i className="bi bi-trash"></i>
                            </button> */}
                                                            <div className="invalid-feedback">
                                                                {errorTopic.text}
                                                            </div>
                                                        </div>

                                                    </div>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="mt-2">
                                <div className="card">
                                    <div className="card-body ">
                                        {

                                            dataquiz ? (
                                                <Card
                                                    style={{
                                                        width: "100%",
                                                        borderWidth: "2px",
                                                    }}
                                                    actions={[
                                                        <Link className="bi bi-eye-fill h5" to={`/student/test/${dataquiz._id}`} state={{ path: location.pathname }} />,
                                                        <Link className="bi bi-pencil-square h5" to={`/teacher/edit-quiz/${dataquiz._id}`} />,
                                                        <Link className="bi bi bi-trash-fill h5" onClick={() => submitRemoveQuiz(dataquiz._id)} />,
                                                    ]}
                                                >
                                                    <Meta
                                                        title={<h4>Quiz</h4>}
                                                        description={<h5>{dataquiz.name}</h5>}
                                                    />
                                                </Card>
                                            )
                                                :
                                                (
                                                    <Card
                                                        style={{
                                                            width: "100%",
                                                            borderWidth: "2px",
                                                        }}

                                                        actions={[
                                                            <Link className="bi bi-file-plus h5" to={`/teacher/quiz/${course._id}`} state={{ path: location.pathname }} />,
                                                        ]}
                                                    >
                                                        <Meta
                                                            title={<h4>Quiz</h4>}
                                                            description={<h5>{dataquiz.name}</h5>}
                                                        />
                                                    </Card>
                                                )

                                        }


                                    </div>
                                </div>
                            </div>

                            {valuetopic.map((item, index) =>
                                <div key={index} className="card mt-2">
                                    <div className="position-relative">
                                        <button type="button" className="btn position-absolute top-0 end-0 "
                                            onClick={() => handleRemoveTopic(index)}
                                        >
                                            <span className="bi bi-x iconx" ></span>
                                        </button>
                                    </div>
                                    <div className="card-body p-5">
                                        <p>Topic</p>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name='title'
                                            id={`title${index}`}
                                            onChange={(e) => {
                                                item.title = e.target.value
                                                SetValueTopic([...valuetopic])
                                                document.getElementById(`title${index}`).classList.remove("is-invalid");
                                            }}
                                            value={item.title}
                                        />
                                        <div className="invalid-feedback">
                                            {errorTopic.title}
                                        </div>
                                        <label className="form-label  mt-3">Detail</label>
                                        <textarea
                                            type="text"
                                            className="form-control"
                                            name='description'
                                            id={`description${index}`}
                                            onChange={(e) => {
                                                item.description = e.target.value
                                                SetValueTopic([...valuetopic])
                                                document.getElementById(`description${index}`).classList.remove("is-invalid");
                                            }}
                                            value={item.description}
                                        />
                                        <div className="invalid-feedback">
                                            {errorTopic.description}
                                        </div>

                                        <div className="d-flex justify-content-between mb-0 mt-5" >
                                            <p className="">Sub Content</p>
                                            <button className="btn h4 text-primary mb-0"
                                                type='Button' onClick={(e) => handdleAddtext(e, index)}
                                            >+</button>
                                        </div>
                                        <hr className="mt-0" />

                                        <div className="mt-2">
                                            <ul>

                                                {item.text.map((ttem, tdex) =>
                                                    <li key={tdex} className="mt-3">
                                                        <div className="input-group">
                                                            <textarea
                                                                type="text"
                                                                className="form-control"
                                                                name="text"
                                                                id={`text${index}${tdex}`}
                                                                onChange={(e) => {
                                                                    ttem.content = e.target.value
                                                                    SetValueTopic([...valuetopic])
                                                                    document.getElementById(`text${index}${tdex}`).classList.remove("is-invalid");
                                                                }}
                                                                value={ttem.content}
                                                            />
                                                            <button className="btn btn-outline-secondary"
                                                                onClick={(e) => handleRemoveText(e, index, tdex)} type='Button'
                                                            >
                                                                <i className="bi bi-trash"></i>
                                                            </button>
                                                            <div className="invalid-feedback">
                                                                {errorTopic.text}
                                                            </div>
                                                        </div>
                                                    </li>
                                                )}
                                            </ul>
                                        </div>

                                        <div className="d-flex justify-content-between mb-0 mt-3" >
                                            <p className="">Link</p>
                                            <button className="btn h4 text-primary mb-0"
                                                type='Button' onClick={(e) => handdleAddlink(e, index)}
                                            >+</button>
                                        </div>
                                        <hr className="mt-0" />

                                        <div className="mt-2">
                                            <ul>

                                                {item.link.map((ttem, tdex) =>
                                                    <li key={tdex} className="mt-3">
                                                        <div className="">
                                                            <div className="input-group mb-2">
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="name"
                                                                    id={`linkname${index}${tdex}`}
                                                                    onChange={(e) => {
                                                                        ttem.name = e.target.value
                                                                        SetValueTopic([...valuetopic])
                                                                        document.getElementById(`linkname${index}${tdex}`).classList.remove("is-invalid");
                                                                    }}
                                                                    value={ttem.name}
                                                                />
                                                                <button
                                                                    className="btn btn-outline-secondary"
                                                                    onClick={(e) => handleRemoveLink(e, index, tdex)}
                                                                    type='Button'
                                                                >
                                                                    <i className="bi bi-trash"></i>
                                                                </button>
                                                                <div className="invalid-feedback">
                                                                    {errorTopic.link_name}
                                                                </div>
                                                            </div>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="url"
                                                                id={`linkurl${index}${tdex}`}
                                                                onChange={(e) => {
                                                                    ttem.url = e.target.value
                                                                    SetValueTopic([...valuetopic])
                                                                    document.getElementById(`linkurl${index}${tdex}`).classList.remove("is-invalid");
                                                                }}
                                                                value={ttem.url}
                                                            />
                                                        </div>
                                                    </li>
                                                )}
                                            </ul>
                                        </div>
                                        <div className="d-flex justify-content-between mb-0 mt-3" >
                                            <p className="">File</p>
                                            <button className="btn h4 text-primary mb-0"
                                                type='Button' onClick={(e) => handdleAddfile(e, index)}
                                            >+</button>
                                        </div>
                                        <hr className="mt-0" />


                                        <div className="mt-2">
                                            <ul>

                                                {item.file.map((ttem, tdex) =>
                                                    <li key={tdex} className="mt-3">
                                                        <div className="">

                                                            {ttem.file == '' ?
                                                                <div className="input-group mb-2">
                                                                    <input type="file" className="form-control"
                                                                        // id={`linkname${index}${tdex}`}
                                                                        onChange={(e) => {
                                                                            ttem.file = e.target.files[0]
                                                                            ttem.name = e.target.files[0].name
                                                                            ttem.filetype = e.target.files[0].type


                                                                            SetValueTopic([...valuetopic])
                                                                        }}

                                                                    />
                                                                    <button className="btn btn-outline-secondary"
                                                                        onClick={(e) => handleRemovefile(e, index, tdex)} type='Button'
                                                                    >
                                                                        <i className="bi bi-trash"></i>
                                                                    </button>
                                                                </div>

                                                                :

                                                                <div className="d-flex justify-content-between">
                                                                    <p className='size-file' >{ttem.name}</p>
                                                                    {/* <p>{ttem.filename}</p> */}
                                                                    <button className="btn btn-outline-secondary"
                                                                        onClick={(e) => handleRemovefile(e, index, tdex)} type='Button'
                                                                    >
                                                                        <i className="bi bi-trash"></i>
                                                                    </button>
                                                                </div>


                                                            }


                                                        </div>
                                                    </li>
                                                )}
                                            </ul>
                                        </div>

                                        {/* <div className="d-flex justify-content-between mb-0 mt-3" >
                                            <p className="">Quiz</p>
                                            <button className="btn h4 text-primary mb-0"
                                                type='Button' onClick={(e) => handdleAddquiz(e, index)}
                                            >+</button>
                                        </div>
                                        <hr className="mt-0" /> */}
                                        {/* <div>

                                            {item.quiz.length > 0 &&
                                                <div className="d-grid">
                                                    <button className="btn btn-outline-secondary" type="button" onClick={hadleAddNewQuiz}> Create new quiz</button>
                                                </div>
                                            }
                                            <ul>
                                                {item.quiz.map((ttem, tdex) =>
                                                    <div key={tdex} className="mt-2">
                                                        <div>
                                                            <li>
                                                                <div className="input-group mb-2">

                                                                    <select
                                                                        id={`quiz${index}${tdex}`}
                                                                        name="quiz"
                                                                        onChange={(e) => {
                                                                            ttem.quiz = JSON.parse(e.target.value)._id
                                                                            ttem.name = JSON.parse(e.target.value).name
                                                                            SetValueTopic([...valuetopic])
                                                                            document.getElementById(`quiz${index}${tdex}`).classList.remove("is-invalid");
                                                                        }}
                                                                        className="form-select" value={ttem.name}
                                                                    >
                                                                        {ttem && <option disabled>{ttem.name}</option>}
                                                                        {dataquiz.map((dtem, ddex) => (
                                                                            <option key={ddex} value={JSON.stringify(dtem)} >{dtem.name}</option>
                                                                        ))}
                                                                    </select>
                                                                    <button
                                                                        className="btn btn-outline-secondary"
                                                                        onClick={(e) => handleRemoveQuiz(e, index, tdex)}
                                                                        type='Button'
                                                                    >
                                                                        <i className="bi bi-trash"></i>
                                                                    </button>
                                                                    <div className="invalid-feedback">
                                                                        {errorTopic.quiz}
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        </div>
                                                    </div>
                                                )}
                                            </ul>
                                        </div> */}
                                    </div>
                                </div>
                            )}

                            <div className="mt-2">
                                <div className="card">
                                    <div className="row card-body p-0 ">
                                        <div className="col pt-2 ps-4">Topic</div>
                                        <div className="col d-flex justify-content-end">
                                            <button type="button" className="btn"
                                                onClick={handleAddTopic}
                                            >
                                                <i className="bi bi-folder-plus h5"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="d-grid my-3">
                                {loading
                                    ? <button className="btn" type="button">
                                        <Spin indicator={antIcon} />
                                    </button>
                                    : <button type="submit" className="btn btn-warning">
                                        {" "}
                                        Save{" "}
                                    </button>
                                }

                            </div>

                        </form>
                    }
                </div>
            </div>
        </div>
    )
}

export default EditCourse