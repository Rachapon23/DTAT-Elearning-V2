import axios from 'axios';

export const createQuiz  = async(authtoken,value) => 
    await axios.post(process.env.REACT_APP_API+'/quiz/create',value,
    {
        headers:{
            authtoken,
        }
    }
);

export const listQuiz  = async(authtoken) =>  
    await axios.get(process.env.REACT_APP_API+'/quiz/list-teacher', 
    {
    headers:{
        authtoken,
    }
});

export const removeQuiz  = async(authtoken,params) => 
    await axios.delete(process.env.REACT_APP_API+'/quiz/remove-quiz/'+params,
    {
    headers:{
        authtoken,
    }
});

export const getQuiz  = async(authtoken,id) =>  
    await axios.get(process.env.REACT_APP_API+'/quiz/get-quiz/'+id, 
    {
    headers:{
        authtoken,
    }
});

export const getQuizByCourseID  = async(authtoken,id) =>  
    await axios.get(process.env.REACT_APP_API+'/quiz/get-course-quiz/'+id, 
    {
    headers:{
        authtoken,
    }
});


export const updateQuiz  = async(authtoken,value) =>  
    await axios.put(process.env.REACT_APP_API+'/quiz/update-quiz',value, 
    {
    headers:{
        authtoken,
    }
});