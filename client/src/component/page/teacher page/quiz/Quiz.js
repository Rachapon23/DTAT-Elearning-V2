import React from 'react'
import NavTeacher from '../../../layout/NavTeacher'
import { useState, useEffect } from 'react'
import { createQuiz } from '../../../../function/teacher/funcQuiz'
import Swal from "sweetalert2";
import './quiz.css'
import { useNavigate, useLocation } from 'react-router-dom'
const Quiz = () => {
    const course_id = useLocation().pathname.split("/")[3];
    const [nextState, setNextState] = useState([]);
    const [valueQuiz, setValueQuiz] = useState([])
    const navigate = useNavigate()
    const [nameQuiz, setNameQuiz] = useState
        ({
            name: "",
            explanation: "",
            course: course_id,
            // attemp: 1,
            teacher: sessionStorage.getItem('user_id')
        })
    const handleAddQuiz = () => {
        setValueQuiz([...valueQuiz,
        {
            title: '',
            q1: "",
            q2: "",
            q3: "",
            q4: "",
            ans: "",
        }
        ])
    }
    const [error, setError] = useState({
        name: "",
        explanation: "",
        // attemp: "",
        title: "",
        q1: "",
        q2: "",
        q3: "",
        q4: "",
        ans1: "",
        ans2: "",
        ans3: "",
        ans4: "",
    }) 

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
    const handAddName = (e) => {
        if(e.target.name === "attemp") {
            setNameQuiz({ ...nameQuiz, [e.target.name]: Number(e.target.value) });    
            return
        }
        setNameQuiz({ ...nameQuiz, [e.target.name]: e.target.value });
        setError({ ...error, [e.target.name]: "" })
    }
    const handSubmit = (e) => {
        e.preventDefault();


        let valid = true;

        if (!!!nameQuiz.name) {
            setError({name: "Please enter name of quiz"})
            valid = false;
            document.getElementById("name").focus({ focusVisible: true });
        }
        else if (!!!nameQuiz.explanation) {
            setError({explanation: "Please enter explanation of quiz"})
            valid = false;
            document.getElementById("explanation").focus({ focusVisible: true });
            // console.log("---")
        }
        else if(nameQuiz.attemp < 1) {
            setError({attemp: "Please enter attemp number greater than 0"})
            valid = false;
            document.getElementById("attemp").focus({ focusVisible: true });
        }
        else if (valueQuiz.length > 0) {
            for (let i = 0; i < valueQuiz.length; i++) {
                if (!!!valueQuiz[i].title) {
                    document.getElementById(`title${i}`).classList.add("is-invalid")
                    // setError({title: "Please enter title of question"})
                    valid = false;
                    document.getElementById(`title${i}`).focus({ focusVisible: true });
                }
                else if (!!!valueQuiz[i].q1) {
                    document.getElementById(`q1${i}`).classList.add("is-invalid")
                    // setError({q1: "Please enter choice of question"})
                    valid = false;
                    document.getElementById(`q1${i}`).focus({ focusVisible: true });
                }
                else if (!!!valueQuiz[i].q2) {
                    document.getElementById(`q2${i}`).classList.add("is-invalid")
                    setError({q2: "Please enter choice of question"})
                    valid = false;
                    document.getElementById(`q2${i}`).focus({ focusVisible: true });
                }
                else if (!!!valueQuiz[i].q3) {
                    document.getElementById(`q3${i}`).classList.add("is-invalid")
                    setError({q3: "Please enter choice of question"})
                    valid = false;
                    document.getElementById(`q3${i}`).focus({ focusVisible: true });
                }
                else if (!!!valueQuiz[i].q4) {
                    document.getElementById(`q4${i}`).classList.add("is-invalid")
                    setError({q4: "Please enter choice of question"})
                    valid = false;
                    document.getElementById(`q4${i}`).focus({ focusVisible: true });
                }
                else if (!!!valueQuiz[i].ans) {
                    console.log("hit6")
                    valid = false;
                    setTimeout(function () {
                        document.getElementById(`1${i}`).classList.add("is-invalid")
                        // setError({ans1: "Please enter answer of question"})
                        document.getElementById(`1${i}`).focus({ focusVisible: true });
                    }, 200);
                    setTimeout(function () {
                        document.getElementById(`1${i}`).classList.remove("is-invalid")
                        document.getElementById(`2${i}`).classList.add("is-invalid")
                        // setError({ans1: ""})
                        // setError({ans2: "Please enter answer of question"})
                        document.getElementById(`2${i}`).focus({ focusVisible: true });
                    }, 400);
                    setTimeout(function () {
                        document.getElementById(`2${i}`).classList.remove("is-invalid")
                        document.getElementById(`3${i}`).classList.add("is-invalid")
                        // setError({ans2: ""})
                        // setError({ans3: "Please enter answer of question"})
                        document.getElementById(`3${i}`).focus({ focusVisible: true });
                    }, 600);
                    setTimeout(function () {
                        document.getElementById(`3${i}`).classList.remove("is-invalid")
                        document.getElementById(`4${i}`).classList.add("is-invalid")
                        // setError({ans3: ""})
                        // setError({ans4: "Please enter answer of question"})
                        document.getElementById(`4${i}`).focus({ focusVisible: true });
                    }, 800);
                    setTimeout(function () {
                        document.getElementById(`4${i}`).classList.remove("is-invalid")
                        // setError({ans4: ""})
                        document.getElementById(`4${i}`).blur();
                    }, 1000);
                }
            }
        }


        if(valid){
            createQuiz(sessionStorage.getItem("token"),
                {
                    head: nameQuiz,
                    body: valueQuiz
                }
            )
                .then(res => {
                    console.log(res)
                    // window.location.reload(false);
                    Toast.fire({
                        icon: 'success',
                        title: 'Your quiz created successfully'
                    })
                    navigate('/teacher/list-quiz')
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    const handleRemoveQuiz = (index) => {
        valueQuiz.splice(index, 1)
        setNextState([...nextState])
    }

    return (
        <div>
            <NavTeacher />
            {/* {JSON.stringify(nameQuiz)} */}
            <div className="container">
                
                <div className="mt-5">
                    <form onSubmit={handSubmit}>
                        <div className="card">
                            <div className="bg-success head-form"></div>
                            <div className="card-body p-5">

                                <div className="row">
                                    <div className="col-12">
                                        <label className="form-label">Quiz Name</label>
                                        <input 
                                            type="text" 
                                            className={
                                                error.name && error.name.length !== 0 ? "form-control is-invalid" : "form-control"
                                            }
                                            name='name'
                                            id="name" 
                                            onChange={handAddName}
                                        />
                                        <div className="invalid-feedback">
                                            {error.name}
                                        </div>
                                    </div>

                                    {/* <div className="col-4">
                                        <label className="form-label"> Attemp </label>
                                        <input 
                                            type="number" 
                                            defaultValue={1} 
                                            min='1'
                                            className={
                                                nameQuiz.attemp < 1 || error.attemp && error.attemp.length !== 0 ? "form-control is-invalid" : "form-control"
                                            }
                                            id="attemp" 
                                            name='attemp'
                                            onChange={handAddName} 
                                        />
                                        <div className="invalid-feedback">
                                            {nameQuiz.attemp < 1 ? "Attemp number must greater than 0":error.attemp}
                                        </div>
                                    </div> */}
                                </div>

                                <div className="row">
                                    <div>
                                        <label className="form-label  mt-3"> Description </label>
                                        <textarea 
                                            type="text" 
                                            className={
                                                error.explanation && error.explanation.length !== 0 ? "form-control is-invalid" : "form-control"
                                            }
                                            name='explanation'
                                            id="explanation"
                                            onChange={handAddName} 
                                        />
                                        <div className="invalid-feedback">
                                            {error.explanation}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        {valueQuiz.map((item, index) => (
                            <div key={index} className="card mt-2">
                                <div className="position-relative">
                                    <button type="button" className="btn position-absolute top-0 end-0 "
                                        onClick={() => handleRemoveQuiz(index)}
                                    >
                                        <span className="bi bi-x iconx" ></span>
                                    </button>
                                </div>
                                <div className="card-body p-5">
                                    <p>Question {index + 1}</p>
                                    <textarea 
                                        type="text" 
                                        placeholder='Question' 
                                        className="form-control"
                                        id={`title${index}`}
                                        onChange={(e) => {
                                            item.title = e.target.value
                                            document.getElementById(`title${index}`).classList.remove("is-invalid")
                                            // setError({title: ""})
                                            setValueQuiz([...valueQuiz])
                                        }}
                                    />
                                    <div className="invalid-feedback">
                                        {error.title}
                                    </div>
                                    <div className="mt-2">

                                        <div className="d-flex mb-2">
                                            <div className="form-check d-flex align-items-center">
                                                <input 
                                                    className="form-check-input"
                                                    type="radio" 
                                                    name={index} 
                                                    id={`1${index}`}
                                                    onChange={(e) => {
                                                        item.ans = "1"
                                                        setValueQuiz([...valueQuiz])
                                                    }}
                                                />
                                                
                                            </div>
                                            <input 
                                                type="text" 
                                                className= "form-control"
                                                id={`q1${index}`}
                                                onChange={(e) => {
                                                    item.q1 = e.target.value
                                                    document.getElementById(`q1${index}`).classList.remove("is-invalid")
                                                    // setError({q1: ""})
                                                    setValueQuiz([...valueQuiz])
                                                }}
                                            />
                                        </div>
                                        <div className="d-flex mb-2">
                                            <div className="form-check d-flex align-items-center">
                                                <input 
                                                    className="form-check-input"
                                                    type="radio" 
                                                    name={index} 
                                                    id={`2${index}`}
                                                    onChange={(e) => {
                                                        item.ans = "2"
                                                        setValueQuiz([...valueQuiz])
                                                    }}
                                                />
                                            </div>
                                            <input 
                                                type="text" 
                                                className= "form-control"
                                                id={`q2${index}`}
                                                onChange={(e) => {
                                                    item.q2 = e.target.value
                                                    document.getElementById(`q2${index}`).classList.remove("is-invalid")
                                                    // setError({q2: ""})
                                                    setValueQuiz([...valueQuiz])
                                                }}
                                            />
                                        </div>
                                        <div className="d-flex mb-2">
                                            <div className="form-check d-flex align-items-center">
                                                <input 
                                                    className="form-check-input"
                                                    type="radio" 
                                                    name={index} 
                                                    id={`3${index}`}
                                                    onChange={(e) => {
                                                        item.ans = "3"
                                                        setValueQuiz([...valueQuiz])
                                                    }}
                                                />
                                            </div>
                                            <input 
                                                type="text" 
                                                className="form-control"
                                                id={`q3${index}`}
                                                onChange={(e) => {
                                                    item.q3 = e.target.value
                                                    document.getElementById(`q3${index}`).classList.remove("is-invalid")
                                                    // setError({q3: ""})
                                                    setValueQuiz([...valueQuiz])
                                                }}
                                            />
                                        </div>
                                        <div className="d-flex mb-2">
                                            <div className="form-check d-flex align-items-center">
                                                <input 
                                                    className="form-check-input"
                                                    type="radio" 
                                                    name={index} 
                                                    id={`4${index}`}
                                                    onChange={(e) => {
                                                        item.ans = "4"
                                                        setValueQuiz([...valueQuiz])
                                                    }}
                                                />
                                            </div>
                                            <input 
                                                type="text" 
                                                className="form-control"
                                                id={`q4${index}`}
                                                onChange={(e) => {
                                                    item.q4 = e.target.value
                                                    document.getElementById(`q4${index}`).classList.remove("is-invalid")
                                                    // setError({q4: ""})
                                                    setValueQuiz([...valueQuiz])
                                                }}
                                            />
                                        </div>

                                    </div>

                                </div>
                            </div>
                        ))}


                        <div className="mt-2">
                            <div className="card">
                                <div className="card-body p-0 ">
                                    <div className="d-flex justify-content-end">
                                        <button type="button" className="btn"

                                            onClick={handleAddQuiz}
                                        >
                                            <i className="bi bi-folder-plus h5"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="d-grid my-3">
                            <button type='submit' className="btn btn-success"> Save </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Quiz