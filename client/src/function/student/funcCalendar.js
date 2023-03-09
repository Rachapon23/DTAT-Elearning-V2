import axios from "axios";


export const listCalendar  = async(authtoken) => 
    await axios.get(process.env.REACT_APP_API+'/list-calendar',
    {
    headers:{
        authtoken,
    }
});
// export const listCalendarUser  = async(authtoken) => 
//     await axios.get(process.env.REACT_APP_API+'/list-calendar-user',
//     {
//     headers:{
//         authtoken,
//     }
// });
export const getCalendar  = async(authtoken,id) => 
    await axios.get(process.env.REACT_APP_API+'/get-calendar/'+id);