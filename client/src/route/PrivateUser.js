import React, { useEffect, useState } from "react";
import { Outlet, Navigate, useParams } from "react-router-dom";
import { routeUser } from "../function/funcroute";

const PrivateUser = () => {

    const [status, setStatus] = useState(true);
    

    const CheckUser = () => {
        routeUser(sessionStorage.getItem("token"))
            .then((res) => {
                // console.log(res.data)
                setStatus(res.data.status)
            }).catch(err=>{
                // console.log(err)
                setStatus(false)
            })
    }

    useEffect(() => {
        CheckUser()
    }, [status])
    return status ? <Outlet/> : <Navigate to="/login"/> 
}

export default PrivateUser