import axios from 'axios'

//สมัครสมาชิก
export const register = async(value) =>
await axios.post(process.env.REACT_APP_API+'/register',value);

//เข้าสู่ระบบ
export const login = async(value) => 
await axios.post(process.env.REACT_APP_API+'/login',value);

// send email to client
export const sendEmail = async(data) =>
await axios.post(process.env.REACT_APP_API+'/send-email', data);

// send new password to change password
export const resetPassword = async(authtoken, data) =>
await axios.post(process.env.REACT_APP_API+'/reset-password', data, {
    headers:{
        authtoken,
    }
});

export const checkToken = async(authtoken) =>
await axios.post(process.env.REACT_APP_API+'/check-token', {}, {
    headers:{
        authtoken,
    }
});

//ตรวจสอบผู้ใช้ปัจจุบัน
export const currentUser = async(authtoken) =>
await axios.post(process.env.REACT_APP_API+'/current-user',{},
    {
    headers:{
        authtoken,
    }
});
// export const currentTeacher = async(authtoken) =>
// await axios.post(process.env.REACT_APP_API+'/current-teacher',{},
//     {
//     headers:{
//         authtoken,
//     }
// });
// export const currentAdmin = async(authtoken) =>
// await axios.post(process.env.REACT_APP_API+'/current-admin',{},
//     {
//     headers:{
//         authtoken,
//     }
// });
//--------------------------
