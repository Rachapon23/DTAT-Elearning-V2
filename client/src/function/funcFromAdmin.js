import axios from 'axios'


export const listAlluser  = async(authtoken) => 
    await axios.get(process.env.REACT_APP_API+'/listalluser',
    {
    headers:{
        authtoken,
    }
});
export const listStudentuser  = async(authtoken) =>
    await axios.get(process.env.REACT_APP_API+'/liststudentuser',
    {
    headers:{
        authtoken,
    }
});
export const listTeacheruser  = async(authtoken) =>
    await axios.get(process.env.REACT_APP_API+'/listteacheruser',
    {
    headers:{
        authtoken,
    }
});

export const changeRole = async(authtoken,value) =>
await axios.post(process.env.REACT_APP_API+'/change-role',value,
    {
    headers:{
        authtoken,
    }
});

export const changeEnable = async(authtoken ,data) => {
    return await axios.post(process.env.REACT_APP_API+"/change_enable", data, 
    {
        headers: {
            authtoken,
        }
    });
}