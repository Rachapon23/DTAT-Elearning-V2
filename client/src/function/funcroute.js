import axios from 'axios';

//---------

export const checkRole  = async(authtoken) =>
await axios.get(process.env.REACT_APP_API+'/check-role',
{
    headers:{
        authtoken,
    }
});

//---------

export const routeUser  = async(authtoken) =>
await axios.get(process.env.REACT_APP_API+'/route-user',
{
    headers:{
        authtoken,
    }
});
export const routeTeacher  = async(authtoken) =>
await axios.get(process.env.REACT_APP_API+'/route-teacher',
{
    headers:{
        authtoken,
    }
});
export const routeAdmin  = async(authtoken) =>
await axios.get(process.env.REACT_APP_API+'/route-admin',
{
    headers:{
        authtoken,
    }
});

//---------