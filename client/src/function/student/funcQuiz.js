import axios from "axios";

export const sendQuiz  = async(authtoken, data) => 
    await axios.post(process.env.REACT_APP_API+'/quiz/send-quiz', data,
    {
    headers:{
        authtoken,
    }
});

export const checkAccessNumber  = async(authtoken, data) =>
    await axios.post(process.env.REACT_APP_API+'/quiz/get-access-number', data,
    {
    headers:{
        authtoken,
    }
});

export const listScore  = async(authtoken, data) =>
    await axios.post(process.env.REACT_APP_API+'/quiz/list-score', data,
    {
    headers:{
        authtoken,
    }
});

export const getQuizByCourseID  = async(authtoken, id) =>
    await axios.get(process.env.REACT_APP_API+'/quiz/get-course-quiz/'+id,
    {
    headers:{
        authtoken,
    }
});