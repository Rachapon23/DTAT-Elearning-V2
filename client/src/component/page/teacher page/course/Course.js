import React from "react";
import NavTeacher from "../../../layout/NavTeacher";
import { listQuiz, createQuiz, getQuizByCourseID } from "../../../../function/teacher/funcQuiz";
import { createCourse } from "../../../../function/teacher/funcCourse";
import {
  listRoom,
  uploadImg,
  uploadfile,
  listPlant,
} from "../../../../function/teacher/funcMiscellaneous";
import { createCalendar } from "../../../../function/teacher/funcCalendar";
import { useState, useEffect } from "react";
import "./course.css";
import Swal from "sweetalert2";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Switch } from "antd";
import CalendarForcourse from "../calendar/CalendarForcourse";
import { Card } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';


const { Meta } = Card;

const Course = () => {
  const[loading,setLoading] = useState(false)
  const [valuetopic, SetValueTopic] = useState([]);
  const [nextState, setNextState] = useState([]);
  const [dataquiz, setDataQuiz] = useState();
  const [newCourse, setNewCourse] = useState("");
  const [room, setRoom] = useState([]);
  const [file, setFile] = useState("");
  const [plant, setPlant] = useState([]);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const [nameCourse, setNameCourse] = useState({
    name: "",
    description: "",
    quiz: null,
    member: [],
    calendar: [],
    statuscourse: false,
    room: "",
    teacher: sessionStorage.getItem("user_id"),
  });

  const [error, setError] = useState({
    name: "",
    description: "",
    course_number: "",
    room: "",
  });

  const errorTopic = {
    title: "Please enter title of topic",
    description: "Please enter description of topic",
    text: "Please enter sub-content of topic",
    link_name: "Please enter name of link",
    link_url: "Please enter URL of link",
    quiz: "Please select quiz of topic",
  };

  const handleAddTopic = () => {
    SetValueTopic([
      ...valuetopic,
      {
        title: "",
        description: "",
        text: [],
        link: [],
        quiz: [],
        file: [],
      },
    ]);
  };
  const handleRemoveTopic = (index) => {
    valuetopic.splice(index, 1);
    setNextState([...nextState]);
  };

  const handAddName = (e) => {
    setNameCourse({ ...nameCourse, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: "" });
  };

  const handdleAddtext = (e, index) => {
    e.preventDefault();
    valuetopic[index].text.push({
      type: "text",
      content: "",
    });
    setNextState([...nextState]);
  };
  const handdleAddlink = (e, index) => {
    e.preventDefault();
    valuetopic[index].link.push({
      type: "link",
      name: "",
      url: "",
    });
    setNextState([...nextState]);
  };

  const handdleAddquiz = (e, index) => {
    e.preventDefault();
    valuetopic[index].quiz.push({
      type: "quiz",
      name: "",
      quiz: "",
    });
    setNextState([...nextState]);
  };

  const handdleAddfile = (e, index) => {
    e.preventDefault();
    valuetopic[index].file.push({
      type: "file",
      name: "",
      file: "",
      filetype: "",
    });
    setNextState([...nextState]);
  };
  const handdleAddStudent = (e, index) => {
    e.preventDefault();
    nameCourse.member.push({
      plant: "",
      amount: 0,
      registerd: 0,
    });
    setNextState([...nextState]);
  };

  const handleRemoveText = (e, index, tdex) => {
    e.preventDefault();
    valuetopic[index].text.splice(tdex, 1);
    setNextState([...nextState]);
  };
  const handleRemoveLink = (e, index, tdex) => {
    e.preventDefault();
    valuetopic[index].link.splice(tdex, 1);
    setNextState([...nextState]);
  };
  const handleRemoveQuiz = (e, index, tdex) => {
    e.preventDefault();
    valuetopic[index].quiz.splice(tdex, 1);
    setNextState([...nextState]);
  };
  const handleRemoveFile = (e, index, tdex) => {
    e.preventDefault();
    valuetopic[index].file.splice(tdex, 1);
    setNextState([...nextState]);
  };
  const handleRemoveStudent = (e, tdex) => {
    e.preventDefault();
    nameCourse.member.splice(tdex, 1);
    setNextState([...nextState]);
  };
  const handleRemovecalendar = (e, tdex) => {
    e.preventDefault();
    nameCourse.calendar.splice(tdex, 1);
    setNextState([...nextState]);
  };

  const loadQuiz = () => {
    getQuizByCourseID(sessionStorage.getItem("token"), nameCourse.quiz)
      .then((res) => {
        // console.log(res.data)
        setDataQuiz(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
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

  const handleAddNewQuiz = () => {
    Swal.fire({
      icon: "warning",
      title: "Warning",
      text: "Are you sure to leave this page",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sure",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await createCourse(sessionStorage.getItem("token"), {
          head: nameCourse,
          body: valuetopic,
        })
          .then(async (res) => {
            const formData = new FormData();
            formData.append("id", res.data._id);
            formData.append("file", file);
            if (file != "") {
              await uploadImg(sessionStorage.getItem("token"), formData)
                .then((res) => {
                  console.log(res);
                })
                .catch((err) => {
                  console.log(err);
                });
            }

            for (let i = 0; i < res.data.calendar.length; i++) {
              await createCalendar(sessionStorage.getItem("token"), {
                values: {
                  title: res.data.name,
                  coursee: res.data._id,
                  start: res.data.calendar[i].start,
                  end: res.data.calendar[i].end,
                  color: res.data.calendar[i].color,
                  teacher: res.data.teacher,
                },
              })
                .then((res) => {
                  console.log(res.data);
                })
                .catch((err) => {
                  console.log(err);
                });
            }
            for (let i = 0; i < valuetopic.length; i++) {
              for (let j = 0; j < valuetopic[i].file.length; j++) {
                // console.log(valuetopic[i].file[j].name)
                const formDatafile = new FormData();
                formDatafile.append("id", res.data._id);
                formDatafile.append("topic_number", i);
                formDatafile.append("file_number", j);
                formDatafile.append("file", valuetopic[i].file[j].file);
                await uploadfile(sessionStorage.getItem("token"), formDatafile)
                  .then((res) => {
                    console.log(res);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
            }

            Toast.fire({
              icon: "success",
              title: "Your course created successfully",
            });
            // await setNewCourse(res.data._id)
            // console.log("new -> ",newCourse)
            navigate("/teacher/quiz/" + res.data._id, { state: { path: `teacher/edit-course/${res.data._id}` } });

          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };


  useEffect(() => {
    loadQuiz();
    loadRoom();
    loadPlant();
  }, []);

  // const handdleSubmit = async (e) => {
  //     e.preventDefault();
  //     // console.log(valuetopic)
  //     // console.log(nameCourse)
  //     let valid = true;

  //     if (!!!nameCourse.name) {
  //         setError({name: "Please enter name of course"})
  //         valid = false;
  //         document.getElementById("nameCourse").focus({ focusVisible: true });
  //     }
  //     else if (!!!nameCourse.course_number) {
  //         setError({course_number: "Please enter course id"})
  //         valid = false;
  //         document.getElementById("course_number").focus({ focusVisible: true });
  //     }
  //     else if (!!!nameCourse.description) {
  //         setError({description: "Please enter description of course"})
  //         valid = false;
  //         document.getElementById("description").focus({ focusVisible: true });
  //     }
  //     else if (!!!nameCourse.room) {
  //         setError({room: "Please select room"})
  //         valid = false;
  //         document.getElementById("room").focus({ focusVisible: true });
  //     }
  //     else if (valuetopic.length > 0) {
  //         // console.log("for")
  //         for (let i = 0; i < valuetopic.length; i++) {
  //             // console.log("for 2")
  //             if (!!!valuetopic[i].title) {
  //                 // setErrorTopic({title: "Please enter title of topic"})
  //                 document.getElementById(`title${i}`).classList.add("is-invalid");
  //                 valid = false;
  //                 document.getElementById(`title${i}`).focus({ focusVisible: true });
  //             }
  //             else if (!!!valuetopic[i].description) {
  //                 // setErrorTopic({description: "Please enter description of topic"})
  //                 document.getElementById(`description${i}`).classList.add("is-invalid");
  //                 valid = false;
  //                 document.getElementById(`description${i}`).focus({ focusVisible: true });
  //             }
  //             else if (valuetopic[i].link.length > 0) {
  //                 for (let j = 0; j < valuetopic[i].link.length; j++) {
  //                     if (!!!valuetopic[i].link[j].name) {
  //                         // setErrorTopic({link_name: "Please enter name of link"})
  //                         document.getElementById(`linkname${i}${j}`).classList.add("is-invalid");
  //                         valid = false;
  //                         document.getElementById(`linkname${i}${j}`).focus({ focusVisible: true });
  //                     } else if (!!!valuetopic[i].link[j].url) {
  //                         // setErrorTopic({link_url: "Please enter URL of link"})
  //                         document.getElementById(`linkurl${i}${j}`).classList.add("is-invalid");
  //                         valid = false;
  //                         document.getElementById(`linkurl${i}${j}`).focus({ focusVisible: true });
  //                     }
  //                 }
  //             }
  //             if (valuetopic[i].text.length > 0) {
  //                 for (let j = 0; j < valuetopic[i].text.length; j++) {
  //                     if (!!!valuetopic[i].text[j].content) {
  //                         // setErrorTopic({text: "Please enter sub-content of topic"})
  //                         document.getElementById(`text${i}${j}`).classList.add("is-invalid");
  //                         valid = false;
  //                         document.getElementById(`text${i}${j}`).focus({ focusVisible: true });
  //                     }
  //                 }
  //             }
  //             if (valuetopic[i].quiz.length > 0) {
  //                 for (let j = 0; j < valuetopic[i].quiz.length; j++) {
  //                     if (!!!valuetopic[i].quiz[j].quiz) {
  //                         // setErrorTopic({quiz: "Please select quiz of topic"})
  //                         document.getElementById(`quiz${i}${j}`).classList.add("is-invalid");
  //                         valid = false;
  //                         document.getElementById(`quiz${i}${j}`).focus({ focusVisible: true });
  //                     }
  //                 }
  //             }
  //         }
  //     }

  //     if(valid){
  //         await createCourse(sessionStorage.getItem("token")
  //             ,
  //             {
  //                 head: nameCourse,
  //                 body: valuetopic,
  //             }
  //         ).then(async res => {
  //             console.log(res.data)
  //             const formData = new FormData();
  //             formData.append('id', res.data._id)
  //             formData.append('file', file)
  //             if (file != '') {
  //                 await uploadImg(sessionStorage.getItem("token"), formData).then(res => {
  //                     console.log(res)

  //                 }).catch(err => {
  //                     console.log(err)
  //                 })
  //             }

  //             for (let i = 0; i < valuetopic.length; i++) {
  //                 for (let j = 0; j < valuetopic[i].file.length; j++) {
  //                     // console.log(valuetopic[i].file[j].name)
  //                     const formDatafile = new FormData();
  //                     formDatafile.append('id', res.data._id)
  //                     formDatafile.append('topic_number', i)
  //                     formDatafile.append('file_number', j)
  //                     formDatafile.append('file',valuetopic[i].file[j].file )
  //                     await uploadfile(sessionStorage.getItem("token"), formDatafile).then(res => {
  //                         console.log(res)

  //                     }).catch(err => {
  //                         console.log(err)
  //                     })
  //                 }
  //             }

  //             Toast.fire({
  //                 icon: 'success',
  //                 title: 'Your course created successfully'
  //             })
  //             // window.location.reload(false);
  //             navigate('/teacher/get-course/'+res.data._id)

  //         }).catch(err => {
  //             console.log(err)
  //         })
  //     }
  // }


  const handdleSubmit = async (e) => {
setLoading(true)
    if (e) {
      e.preventDefault()
    }
    await createCourse(sessionStorage.getItem("token"), {
      head: nameCourse,
      body: valuetopic,
    })
      .then(async (res) => {
        setNewCourse(res.data._id)
        const formData = new FormData();
        formData.append("id", res.data._id);
        formData.append("file", file);
        if (file != "") {
          await uploadImg(sessionStorage.getItem("token"), formData)
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
        }

        for (let i = 0; i < res.data.calendar.length; i++) {
          await createCalendar(sessionStorage.getItem("token"), {
            values: {
              title: res.data.name,
              coursee: res.data._id,
              start: res.data.calendar[i].start,
              end: res.data.calendar[i].end,
              color: res.data.calendar[i].color,
              teacher: res.data.teacher,
            },
          })
            .then((res) => {
              console.log(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
        }
        for (let i = 0; i < valuetopic.length; i++) {
          for (let j = 0; j < valuetopic[i].file.length; j++) {
            // console.log(valuetopic[i].file[j].name)
            const formDatafile = new FormData();
            formDatafile.append("id", res.data._id);
            formDatafile.append("topic_number", i);
            formDatafile.append("file_number", j);
            formDatafile.append("file", valuetopic[i].file[j].file);
            await uploadfile(sessionStorage.getItem("token"), formDatafile)
              .then((res) => {
                console.log(res);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }

        Toast.fire({
          icon: "success",
          title: "Your course created successfully",
        });

        if (e) {
          setLoading(false)
          navigate("/teacher/get-course/" + res.data._id);
        }
      })
      .catch((err) => {
        setLoading(false)
        console.log(err);
      });
  };

  const handleImg = (e) => {
    setFile(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  return (
    <div>
      <NavTeacher />
      <div className="container">
        <div className="mt-5">
          <form onSubmit={handdleSubmit}>
            <div className="card">
              <div className="bg-primary head-form"></div>
              <div className="card-body p-5">
                <label className="form-label">Course Name</label>
                <input
                  type="text"
                  className={
                    error.name && error.name.length !== 0
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  name="name"
                  id="nameCourse"
                  onChange={handAddName}
                />
                <div className="invalid-feedback">{error.name}</div>

                <label className="form-label  mt-3">Description</label>
                <textarea
                  type="text"
                  className={
                    error.description && error.description.length !== 0
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  name="description"
                  id="description"
                  onChange={handAddName}
                />
                <div className="invalid-feedback">{error.description}</div>
                <div className="row">
                  <div className="col-md-6">
                    <label className="form-label  mt-3">Room</label>
                    <div className="">
                      <select
                        name="room"
                        id="room"
                        className={
                          error.room && error.room.length !== 0
                            ? "form-control is-invalid"
                            : "form-control"
                        }
                        onChange={handAddName}
                      >
                        <option value="">select room...</option>
                        {room.map((item, index) => (
                          <option key={index} value={item._id}>
                            {item.room}
                          </option>
                        ))}
                      </select>
                      <div className="invalid-feedback">{error.room}</div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label  mt-3">
                      public or register
                    </label>
                    <div className="">
                      <Switch
                        defaultChecked={nameCourse.statuscourse}
                        onChange={(e) => {
                          setNameCourse({ ...nameCourse, statuscourse: e });
                        }}
                      />
                    </div>
                  </div>
                </div>

                <label className="form-label  mt-3">Cover Picture</label>
                <div className="">
                  <input
                    type="file"
                    className="form-control"
                    onChange={handleImg}
                  />
                  <p className="text-end mt-2" style={{ fontSize: "12px" }}>
                    {" "}
                    recommend size 820px * 312px{" "}
                  </p>
                </div>
                {nameCourse.statuscourse && (
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
                          {nameCourse.member.map((ttem, tdex) => (
                            <li key={tdex} className="mt-3">
                              <div className="input-group ">
                                <select
                                  name=""
                                  id=""
                                  className="form-select"
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
                      <CalendarForcourse
                        nameCourse={nameCourse}
                        setNextState={setNextState}
                        nextState={nextState}
                      />

                      {nameCourse.calendar.map((ttem, tdex) => (
                        <div key={tdex} className="mt-3">
                          {/* <li > */}
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
                            <button
                              className="btn btn-outline-secondary"
                              onClick={(e) => handleRemovecalendar(e, tdex)}
                              type="Button"
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                            <div className="invalid-feedback">
                              {errorTopic.text}
                            </div>
                          </div>
                          {/* </li> */}
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
                  <Card
                    style={{
                      width: "100%",
                      borderWidth: "2px",
                    }}
                    actions={[
                      <Link class="bi bi-file-plus h5" onClick={handleAddNewQuiz} state={{ path: pathname }} />,
                    ]}
                  >
                    <Meta
                      title={<h4>Quiz</h4>}
                    />
                  </Card>
                </div>
              </div>
            </div>


            {/* <div className="card mt-3">
                <div className="card-body">
                    <div className="card" onClick={handleAddNewQuiz}>
                        <div className="input-group mb ">
                            <span className="input-group-text" id="basic-addon1">Quiz</span>
                            <div className="col-sm-10 ">
                                <input type="text" className="form-control-plaintext ps-3" readOnly={true} />
                            </div>
                            <button class="col btn btn-outline-success" type="button" onClick={handleAddNewQuiz}>Add Quiz</button>
                        </div>
                    </div>
                </div>
            </div> */}

            {valuetopic.map((item, index) => (
              <div key={index} className="card mt-2">
                <div className="position-relative">
                  <button
                    type="button"
                    className="btn position-absolute top-0 end-0 "
                    onClick={() => handleRemoveTopic(index)}
                  >
                    <span className="bi bi-x iconx"></span>
                  </button>
                </div>
                <div className="card-body p-5">
                  <p>Topic</p>
                  <div>
                    <input
                      type="text"
                      className="form-control"
                      name="title"
                      id={`title${index}`}
                      onChange={(e) => {
                        item.title = e.target.value;
                        SetValueTopic([...valuetopic]);
                        // setErrorTopic({...errorTopic, [e.target.name]: ""});
                        document
                          .getElementById(`title${index}`)
                          .classList.remove("is-invalid");
                      }}
                    />
                    <div className="invalid-feedback">{errorTopic.title}</div>
                  </div>

                  <div>
                    <label className="form-label  mt-3"> Detail </label>
                    <textarea
                      type="text"
                      className="form-control"
                      name="description"
                      id={`description${index}`}
                      onChange={(e) => {
                        item.description = e.target.value;
                        SetValueTopic([...valuetopic]);
                        // setErrorTopic({...errorTopic, [e.target.name]: ""});
                        document
                          .getElementById(`description${index}`)
                          .classList.remove("is-invalid");
                      }}
                    />
                    <div className="invalid-feedback">
                      {errorTopic.description}
                    </div>
                  </div>

                  <div className="d-flex justify-content-between mb-0 mt-4">
                    <p className="">Sub Content</p>
                    <button
                      className="btn h4 text-primary mb-0"
                      type="Button"
                      onClick={(e) => handdleAddtext(e, index)}
                    >
                      +
                    </button>
                  </div>
                  <hr className="mt-0" />

                  <div className="mt-2">
                    <ul>
                      {item.text.map((ttem, tdex) => (
                        <li key={tdex} className="mt-3">
                          <div className="input-group">
                            <textarea
                              type="text"
                              className="form-control"
                              name="text"
                              id={`text${index}${tdex}`}
                              onChange={(e) => {
                                ttem.content = e.target.value;
                                SetValueTopic([...valuetopic]);
                                // setErrorTopic({text: ""})
                                document
                                  .getElementById(`text${index}${tdex}`)
                                  .classList.remove("is-invalid");
                              }}
                            />
                            <button
                              className="btn btn-outline-secondary"
                              onClick={(e) => handleRemoveText(e, index, tdex)}
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

                  <div className="d-flex justify-content-between mb-0 mt-3">
                    <p className="">Link</p>
                    <button
                      className="btn h4 text-primary mb-0"
                      type="Button"
                      onClick={(e) => handdleAddlink(e, index)}
                    >
                      +
                    </button>
                  </div>
                  <hr className="mt-0" />

                  <div className="mt-2">
                    <ul>
                      {item.link.map((ttem, tdex) => (
                        <li key={tdex} className="mt-3">
                          <div className="">
                            <div className="input-group mb-2">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="name"
                                id={`linkname${index}${tdex}`}
                                onChange={(e) => {
                                  ttem.name = e.target.value;
                                  SetValueTopic([...valuetopic]);
                                  // setErrorTopic({link_name: ""})
                                  document
                                    .getElementById(`linkname${index}${tdex}`)
                                    .classList.remove("is-invalid");
                                }}
                              />
                              <button
                                className="btn btn-outline-secondary"
                                onClick={(e) =>
                                  handleRemoveLink(e, index, tdex)
                                }
                                type="Button"
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
                                ttem.url = e.target.value;
                                SetValueTopic([...valuetopic]);
                                // setErrorTopic({link_url: ""})
                                document
                                  .getElementById(`linkurl${index}${tdex}`)
                                  .classList.remove("is-invalid");
                              }}
                            />
                            <div className="invalid-feedback">
                              {errorTopic.link_url}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="d-flex justify-content-between mb-0 mt-3">
                    <p className="">File</p>
                    <button
                      className="btn h4 text-primary mb-0"
                      type="Button"
                      onClick={(e) => handdleAddfile(e, index)}
                    >
                      +
                    </button>
                  </div>
                  <hr className="mt-0" />

                  <div className="mt-2">
                    <ul>
                      {item.file.map((ttem, tdex) => (
                        <li key={tdex} className="mt-3">
                          <div className="">
                            <div className="input-group mb-2">
                              <input
                                type="file"
                                className="form-control"
                                placeholder="name"
                                // id={`linkname${index}${tdex}`}
                                onChange={(e) => {
                                  ttem.name = e.target.files[0].name;
                                  ttem.filetype = e.target.files[0].type;
                                  ttem.file = e.target.files[0];
                                  // ttem.name = e.target.value
                                  // console.log(e.target.files[0].type)
                                  SetValueTopic([...valuetopic]);
                                }}
                              />
                              <button
                                className="btn btn-outline-secondary"
                                onClick={(e) =>
                                  handleRemoveFile(e, index, tdex)
                                }
                                type="Button"
                              >
                                <i className="bi bi-trash"></i>
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="d-flex justify-content-between mb-0 mt-3">
                    <p className=""> Quiz </p>
                    <button
                      className="btn h4 text-primary mb-0"
                      type="Button"
                      onClick={(e) => handdleAddquiz(e, index)}
                    >
                      +
                    </button>
                  </div>
                  <hr className="mt-0" />
                  <div>
                    {item.quiz.length > 0 && (
                      <div className="d-grid">
                        <button
                          className="btn btn-outline-secondary"
                          type="button"
                          onClick={handleAddNewQuiz}
                        >
                          Create new quiz
                        </button>
                      </div>
                    )}
                    <ul>
                      {item.quiz.map((ttem, tdex) => (
                        <div key={tdex} className="mt-2">
                          <div>
                            <li>
                              <div className="input-group mb-2">
                                <select
                                  id={`quiz${index}${tdex}`}
                                  name="quiz"
                                  onChange={(e) => {
                                    ttem.quiz = JSON.parse(e.target.value)._id;
                                    ttem.name = JSON.parse(e.target.value).name;
                                    SetValueTopic([...valuetopic]);
                                    // setErrorTopic({quiz: ""})
                                    document
                                      .getElementById(`quiz${index}${tdex}`)
                                      .classList.remove("is-invalid");
                                  }}
                                  className="form-control"
                                  defaultValue={"DEFAULT"}
                                >
                                  <option value="DEFAULT" disabled>
                                    select quiz...
                                  </option>
                                  {dataquiz.map((dtem, ddex) => (
                                    <option
                                      key={ddex}
                                      value={JSON.stringify(dtem)}
                                    >
                                      {dtem.name}
                                    </option>
                                  ))}
                                </select>
                                <button
                                  className="btn btn-outline-secondary"
                                  onClick={(e) =>
                                    handleRemoveQuiz(e, index, tdex)
                                  }
                                  type="Button"
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
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}

            {/* <div className="mt-2">
              <div className="card">
                <div className="row card-body p-0 ">
                  <div className="col pt-2 ps-4">Quiz</div>
                  <div className="col d-flex justify-content-end">
                    <button
                      type="button"
                      className="btn"
                      onClick={handleAddNewQuiz}
                    >
                      <i className="bi bi-file-earmark-plus h5"/>
                    </button>
                  </div>
                </div>
              </div>
            </div> */}

            <div className="mt-2">
              <div className="card">
                <div className="row card-body p-0 ">
                  <div className="col pt-2 ps-4">Topic</div>
                  <div className="col d-flex justify-content-end">
                    <button
                      type="button"
                      className="btn"
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
                : <button type="submit" className="btn btn-primary">
                  {" "}
                  Save{" "}
                </button>
              }

            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Course;
