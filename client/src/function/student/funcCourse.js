import axios from "axios";

export const Searchcourse  = async(authtoken,query) =>
await axios.post(process.env.REACT_APP_API+'/searchcourse',query,
{
headers:{
    authtoken,
}
});


export const Addchcourse  = async(authtoken,course_id) => 
await axios.post(process.env.REACT_APP_API+'/addchcourse', course_id,
{
headers:{
    authtoken,
}
});

export const getMycourse  = async(authtoken,id) =>
await axios.get(process.env.REACT_APP_API+'/get-my-course/'+id,
{
headers:{
    authtoken,
}
});

export const getCourse  = async(authtoken,id) =>
await axios.get(process.env.REACT_APP_API+'/get-course/'+id);

export const listQuizby  = async(authtoken,params) => 
    await axios.get(process.env.REACT_APP_API+'/quiz/list-quiz-by/'+params,
    {
    headers:{
        authtoken,
    }
});

export const publicCourses  = async(authtoken) => {
    return await axios.get(process.env.REACT_APP_API+'/list-public-courses',
    {
        headers:{
            authtoken,
        }
    }
)}



export const deleteMyCourse  = async(authtoken,user_id,id) => 
await axios.post(process.env.REACT_APP_API+'/delete-my-course/'+id,{user_id},
{
headers:{
    authtoken,
}
});

export const updateProcess  = async(authtoken, process) => 
await axios.post(process.env.REACT_APP_API+'/student-activity/update-process',{process: process},
{
headers:{
    authtoken,
}
});
