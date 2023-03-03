import axios from "axios";

export const carousel  = async(authtoken,data) => 
    await axios.post(process.env.REACT_APP_API+'/home/carousel',data,
    {
    headers:{
        authtoken,
    }
});
export const postcourse  = async(authtoken,id) => 
    await axios.post(process.env.REACT_APP_API+'/home/course',id,
    {
    headers:{
        authtoken,
    }
});
export const postReGiscourse = async(authtoken,id) => 
    await axios.post(process.env.REACT_APP_API+'/home/regiscourse',id,
    {
    headers:{
        authtoken,
    }
});

export const listHome  = async(authtoken) => 
    await axios.get(process.env.REACT_APP_API+'/home/list',
    {
    headers:{
        authtoken,
    }
});
export const removeCarousel  = async(authtoken,value) => 
    await axios.put(process.env.REACT_APP_API+'/home/remove',value,
    {
    headers:{
        authtoken,
    }
});
export const removeCourse  = async(authtoken,value) => 
    await axios.put(process.env.REACT_APP_API+'/home/remove-course',value,
    {
    headers:{
        authtoken,
    }
});
export const removeCourse2  = async(authtoken,value) => 
    await axios.put(process.env.REACT_APP_API+'/home/remove-course2',value,
    {
    headers:{
        authtoken,
    }
});

export const listCourse  = async(authtoken) =>
await axios.get(process.env.REACT_APP_API+'/get-mycourse-teacher',
{
headers:{
    authtoken,
}
});