import axios from 'axios';

export const createCourse  = async(authtoken,value) =>  
await axios.post(process.env.REACT_APP_API+'/create-course',value,
{
headers:{
    authtoken,
}
});
export const updateCourse  = async(authtoken,value) => 
await axios.put(process.env.REACT_APP_API+'/update-course',value,
{
headers:{
    authtoken,
}
});

export const listCourses  = async(authtoken) => 
await axios.get(process.env.REACT_APP_API+'/list-courses',
{
headers:{
    authtoken,
}
});

export const getmyCourseTeacher  = async(authtoken) =>
await axios.get(process.env.REACT_APP_API+'/get-mycourse-teacher',
{
headers:{
    authtoken,
}
});


export const getCourse  = async(authtoken,id) =>
await axios.get(process.env.REACT_APP_API+'/get-course/'+id,
{
headers:{
    authtoken,
}
});

export const removeCourse = async(authtoken,params) => 
await axios.delete(process.env.REACT_APP_API+'/delete-courses/'+params,
{
    headers:{
        authtoken,
    }
});


export const enablecourse  = async(authtoken,value) =>
await axios.post(process.env.REACT_APP_API+'/enable-course/',value,
{
headers:{
    authtoken,
}
});
