import axios from 'axios';

export const listRoom  = async(authtoken) =>
await axios.get(process.env.REACT_APP_API+'/list-room',
{
headers:{
    authtoken,
}
});


export const uploadImg  = async(authtoken,file) =>
await axios.post(process.env.REACT_APP_API+'/upload-img',file,
{
headers:{
    authtoken,
}
});
export const upDateImg  = async(authtoken,file) =>
await axios.post(process.env.REACT_APP_API+'/update-img',file,
{
headers:{
    authtoken,
}
});

export const uploadfile  = async(authtoken,file) =>
await axios.post(process.env.REACT_APP_API+'/upload-file',file,
{
headers:{
    authtoken,
}
});


export const getMyaccount  = async(authtoken) =>
await axios.get(process.env.REACT_APP_API+'/get-myaccount',
{
    headers:{
        authtoken,
    }
});
export const uploadProfile  = async(authtoken,file) =>
await axios.post(process.env.REACT_APP_API+'/upload-profile',file,
{
    headers:{
        authtoken,
    }
});
export const updateProfile  = async(authtoken,value) =>
await axios.post(process.env.REACT_APP_API+'/update-profile',value,
{
    headers:{
        authtoken,
    }
});

export const listPlant = async () =>
  await axios.get(process.env.REACT_APP_API + "/list-plant");