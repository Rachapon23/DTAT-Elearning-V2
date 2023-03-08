import React from 'react'
import NavStudent from "../../layout/NavStudent"
import { listQuizby } from '../../../function/student/funcCourse'
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
// import Swal from 'sweetalert2'
import { useParams } from 'react-router-dom'
import { sendQuiz, checkAccessNumber, listScore } from '../../../function/student/funcQuiz';
import { useLocation } from 'react-router-dom';
import { Table } from "antd";

const Dotest = () => {
    const quizId = useParams();
    const navigate = useNavigate();
    const [dataQuiz, setDataQuiz] = useState()
    const [qusetion, setQusetion] = useState([])
    const { params } = useParams()
    const { state } = useLocation()
    const location = useLocation()
    console.log("--> ", location)

    const [startQuiz, setStartQuiz] = useState(false)
    const [endQuiz, setEndQuiz] = useState(false)
    const [quizActive, setQuizActive] = useState(false)
    const [attempNumber, setAttempNumber] = useState(0)
    const [maxAttemp, setMaxAttemp] = useState(0)
    const [maxScore, setMaxScore] = useState(0)

    const [examinerScores, setExaminerScores] = useState([])

    useEffect(() => {
        fetchAccessNumber()
        loadData();
        fetchScore();
    }, [endQuiz])

    const [value, setValue] = useState([])
    // const value = []

    const loadData = () => {
        listQuizby(sessionStorage.getItem("token"), params)
            .then(res => {
                // console.log(res)
                setDataQuiz(res.data)
                setQusetion(res.data.question)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const fetchAccessNumber = () => {
        checkAccessNumber(sessionStorage.getItem("token"), {
            examiner_id: sessionStorage.getItem("user_id"),
            quiz: quizId.params
        })
            .then(res => {
                console.log(res)
                setQuizActive(res.data.quiz_active)
                setAttempNumber(res.data.access_number)
                setMaxAttemp(res.data.maximum_access)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const fetchScore = () => {
        listScore(sessionStorage.getItem("token"), {
            examiner_id: sessionStorage.getItem("user_id"),
            quiz: quizId.params
        })
            .then(res => {
                // console.log(res)
                setExaminerScores(res.data)
                setMaxScore(res.data[0].max_score)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const send = () => {
        console.log(value)
        let data = {
            examiner_id: sessionStorage.getItem("user_id"),
            examiner_name: sessionStorage.getItem("firstname"),
            ans: value,
            quiz: quizId.params,
        }
        console.log(data)
        sendQuiz(sessionStorage.getItem("token"), data)
            .then(res => {
                console.log(res)
                // navigate('/student/get-course/'+state.id)
                setStartQuiz(false);
                setEndQuiz(true);
                setValue([])
            })
            .catch(err => {
                console.log(err)
            })
    }
    const handleChange = (index, ch) => {
        value[index.target.name] = ch
    };

    const handleStartQuiz = () => {
        setStartQuiz(true);
        setEndQuiz(false);
    }
    const handleBackToCourse = () => {
        
        navigate(state.path)
    }

    const columns = [
        {
            title: 'Attemp',
            align: 'center',
            dataIndex: 'key',
        },
        {
            title: `Score (max score is ${maxScore})`,
            align: 'center',
            dataIndex: 'score',
        },
    ];
    // console.log(!!dataQuiz)
    return (
        <div>
            <NavStudent />
            {/* {JSON.stringify(examinerScores)} */}
            <div className="container">

                {
                    !startQuiz ? (
                        <div>
                            <div className="mt-5 card text-center">
                                <div className="bg-success head-form"></div>
                                <div className="card-header">
                                    {!!dataQuiz ?
                                        <h3>หัวข้อการทดสอบ : {dataQuiz.name}</h3>
                                        : <h3 className='text-danger'>this quiz is now not available</h3>

                                    }
                                </div>
                                <div className="card-body">
                                    {!!dataQuiz ?
                                        <div>
                                            <h5 className="card-title">This quiz have {maxAttemp} attemp</h5>
                                            <p className="card-text">Your current attemp is {attempNumber}/{maxAttemp} </p>
                                            {/* {endQuiz ? (<h5 className="card-text"> Your score is {1}/{1}</h5>):(<div/>)} */}
                                            <div>
                                                <button className="btn btn-secondary me-3" onClick={handleBackToCourse}>Back to Course</button>
                                                {
                                                    quizActive ?
                                                        <button className="btn btn-primary " onClick={handleStartQuiz}>Start Quiz</button>
                                                        :
                                                        (<div />)
                                                }
                                            </div>
                                        </div>
                                        : <div className='row p-2'>
                                            <div className="card back-public-2 shadow-sm ">
                                                <div className="card-body p-5">
                                                    <div className="row">
                                                        <div className="d-flex justify-content-center">
                                                            <h1 className='nodata'><i className="bi bi-inboxes"></i></h1>
                                                        </div>
                                                        <div className="d-flex justify-content-center">
                                                            <p className='nodata'>No data</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    }


                                </div>

                            </div>

                            {
                                examinerScores.length !== 0 ?
                                    (
                                        <div className="mt-3 card">
                                            <Table columns={columns} dataSource={examinerScores} bordered></Table>
                                        </div>
                                    )
                                    :
                                    (<div />)
                            }

                        </div>
                    ) :
                        (
                            quizActive && (
                                <div>
                                    <div className="mt-3 card">
                                        <div className=' card-body'>
                                            {dataQuiz && <h3>หัวข้อการทดสอบ : {dataQuiz.name}</h3>}
                                        </div>
                                    </div>
                                    {qusetion.map((item, index) =>
                                        <div className="mt-3 card">
                                            <div
                                                key={index} className="card-body mt-3 p-3">
                                                <p>ข้อที่ {index + 1}</p>

                                                <p>{item.title}</p>

                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name={index}
                                                        onChange={(e) => handleChange(e, 1)}
                                                    />
                                                    <p>1. {item.q1}</p>
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name={index}
                                                        onChange={(e) => handleChange(e, 2)}
                                                    />
                                                    <p>2. {item.q2}</p>
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name={index}
                                                        onChange={(e) => handleChange(e, 3)}
                                                    />
                                                    <p>3. {item.q3}</p>
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name={index}
                                                        onChange={(e) => handleChange(e, 4)}
                                                    />
                                                    <p>4. {item.q4}</p>
                                                </div>

                                            </div>
                                        </div>
                                    )}


                                    <div className="d-flex justify-content-end mt-3 mb-5" data-bs-toggle="modal" data-bs-target="#confirmSubmmit">
                                        <button className="btn btn-success w-25" >ส่ง</button>
                                    </div>

                                    <div className="modal" id="confirmSubmmit" tabindex="-1" aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="exampleModalLabel"> Notify </h5>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body">
                                                    Are you sure to submmit
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"> Cancle</button>
                                                    <button type="button" className="btn btn-success" onClick={send} data-bs-dismiss="modal"> Submmit</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        )
                }

            </div>
        </div>
    )
}

export default Dotest