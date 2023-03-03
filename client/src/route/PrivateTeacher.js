import React, { useEffect, useState } from "react";
import { Outlet, Navigate, useParams } from "react-router-dom";
import { routeTeacher } from "../function/funcroute";

const PrivateTeacher = () => {
    const [status, setStatus] = useState(true);

    
    const CheckTeacher = () => {
        routeTeacher(sessionStorage.getItem("token"))
            .then((res) => {
                console.log(res.data)
                setStatus(res.data)
            }).catch(err=>{
                console.log(err)
                setStatus(false)
            })
    }

    useEffect(() => {
        CheckTeacher()
    }, [])
  return (
    status ? <Outlet/> : <Navigate to="/"/> 
  )
}

export default PrivateTeacher